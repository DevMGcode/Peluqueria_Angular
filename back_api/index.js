const express    = require('express');
const conectarDB = require('./config/db');
const cors       = require('cors');

const aplicacion = express();

conectarDB();

aplicacion.use(cors({ origin: '*' }));
aplicacion.use(express.json());

aplicacion.use('/api/tinte', require('./routes/tinte'));
aplicacion.use('/api/cita',  require('./routes/cita'));

const PORT = process.env.PORT || 4000;
aplicacion.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
