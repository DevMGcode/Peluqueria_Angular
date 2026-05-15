const mongoose = require('mongoose');// llamado del servicio de mongo

require('dotenv').config({ path: '.env' });

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
        console.log('⚠️  MongoDB no disponible:', error.message);
        console.log('👉  Revisa que el cluster de Atlas esté activo en cloud.mongodb.com');
    }
}

//exportar la funcion para la conexion
module.exports = conectarDB