const mongoose = require('mongoose');// llamado del servicio de mongo

require('dotenv').config({path:'config.env'});//llamado del archivo de variables importantes

const conectarDB = async()=>{

    try {

        await mongoose.connect(process.env.MONGO_DB,{//configuracion para conexion a mongo

            useNewUrlParser: true,
            useUnifiedTopology:true,
            //useFindAndModify: false,
        }
            )
        console.log("BD conectada");
        
    } catch (error) {
        console.log(error);
        process.exit(1);//detener aplicacion

    }
}

//exportar la funcion para la conexion
module.exports = conectarDB