require('dotenv').config({ path: '.env' });

const express    = require('express');
const helmet     = require('helmet');
const cors       = require('cors');
const rateLimit  = require('express-rate-limit');
const conectarDB = require('./config/db');

const aplicacion = express();

conectarDB();

// Seguridad HTTP headers
aplicacion.use(helmet());

// CORS: solo dominios permitidos
const origenesPermitidos = [
    'http://localhost:4200',
    'https://devmgcode.github.io',
    process.env.FRONTEND_URL
].filter(Boolean);

aplicacion.use(cors({
    origin: (origin, callback) => {
        if (!origin || origenesPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS: origen no permitido'));
        }
    },
    credentials: true
}));

// Rate limiting: max 100 peticiones por IP cada 15 minutos
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { msg: 'Demasiadas peticiones. Intenta en 15 minutos.' }
});
aplicacion.use('/api/', limiter);

aplicacion.use(express.json());

// Rutas
aplicacion.use('/api/auth',  require('./routes/auth'));
aplicacion.use('/api/tinte', require('./routes/tinte'));
aplicacion.use('/api/cita',  require('./routes/cita'));

const PORT = process.env.PORT || 4000;
aplicacion.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
