const Cita = require("../models/Cita");


exports.reservarCita = async(req, res) =>{

    //console.log('creando el producto desde el controlador');
    //console.log(req.body);

    try {
        let data_cita;
        data_cita = new Cita (req.body);
        await data_cita.save();
        res.send(data_cita)
    } catch (error) { 
        console.log(error)
        res.status(500).send('upss...error en la API :(')
    }
}

exports.consultarCitas = async(req, res) =>{
    try {
        const mis_citas= await Cita.find();
        res.json(mis_citas)

    } catch (error) {
        
        console.log(error)
        res.status(500).send('no se puede consultar la informacion')
    }
}



exports.actualizarCita = async(req,res) =>{
    try {
       
        console.log(req.body)
        const {nombre,fecha,hora,motivo} = req.body
        let data_cita= await Cita.findById(req.params.id); //busca algun doc en la collecion por medio del id
        console.log(data_cita)

        if(!data_cita){

          res.status(404 ).json({msg:'NO existe la cita solicitada; nose realiza ninguna actualizacion'})
        }

        data_cita.nombre = nombre;
        data_cita.fecha = fecha;
        data_cita.hora = hora;
        data_cita.motivo = motivo;


        data_cita = await Cita.findOneAndUpdate({_id:req.params.id}, data_cita,{new:true})
        res.json(data_cita);

    } catch (error) {
        console.log(error)
        res.status(500).send('no se puede actualizar contactese con el administrador')
    }

}


exports.eliminarCita = async(req,res)=> {

    try {
      let data_cita= await Cita.findById(req.params.id)
      
      if(!data_cita){
        res.status(404).json({msj:'no existe la cita a eliminar en la BD'})
      }
  
      await Cita.findOneAndRemove({_id:req.params.id});
      res.json({msj:'Cita eliminada correctamente'})
    } catch (error) {
      console.log(error)
      res.status(500).send('el dato no se puede eliminar');
      }
    }

    exports.encontrarCita = async(req,res)=>{
        try {
          let data_cita= await Cita.findById(req.params.id);
    
          if(!data_cita){
            res.status(404).json({msj:'la cita no existe BD'})
          }
    
          res.json(data_cita);
    
        } catch (error) {
        console.log(error);
        res.status(500).send('no se puede hacer la consulta');
        }
    
      }