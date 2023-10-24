//console.log("texto de prueba con nodemon")

/* metodo requiere vamos a llamar cualquier herramienta de express */
const express = require('express'); //para guardarlos - llamada de servicio de express
const conectarDB = require('./config/db');
const cors = require('cors');

const aplicacion = express() // incializarlos con los parametros a esa variable - Implementa servicio en la aplicacion

const corsOptions = {
    origin: 'http://localhost:4200',  // Permitir solicitudes desde localhost:4200
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: 'Content-Type, Authorization, Prefer' // Agrega Prefer a los encabezados permitidos
  };


conectarDB(); //conexion al cluster -db.js
aplicacion.use(cors(corsOptions));
//aplicacion.get('/',(req,res)=>{
//
//    res.send("hola")
//})
aplicacion.use(express.json());
//cambio agregartinte por tintes
aplicacion.use('/api/tinte',require('./routes/tinte'));
aplicacion.use('/api/cita',require('./routes/cita')); /* hay q realizarlo */

//aplicacion.use('/api/cita',require('./routes/cita'));
/* /api/agregartinte */
//localhost:4000 - 127.0.0.1:4000

aplicacion.listen(4000,()=>{

    console.log("el servidor esta funcionando");
})

