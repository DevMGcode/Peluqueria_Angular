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

exports.misCitas = async(req, res) =>{
    try {
        const citas = await Cita.find({ email: req.usuario.email });
        res.json(citas)
    } catch (error) {
        console.log(error)
        res.status(500).send('no se puede consultar la informacion')
    }
}

exports.cancelarCita = async(req, res) =>{
    try {
        const cita = await Cita.findById(req.params.id);

        if(!cita){
            return res.status(404).json({msg:'La cita no existe.'});
        }

        // Un cliente solo puede cancelar sus propias citas
        const esStaff = ['admin', 'empleado'].includes(req.usuario.rol);
        if(!esStaff && cita.email !== req.usuario.email){
            return res.status(403).json({msg:'No puedes cancelar una cita que no es tuya.'});
        }

        if(cita.estado === 'cancelada'){
            return res.status(400).json({msg:'La cita ya está cancelada.'});
        }
        if(cita.estado === 'completada'){
            return res.status(400).json({msg:'No se puede cancelar una cita completada.'});
        }

        cita.estado = 'cancelada';
        await cita.save();
        res.json(cita);

    } catch (error) {
        console.log(error)
        res.status(500).send('no se pudo cancelar la cita')
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

        const {nombre,fecha,hora,motivo} = req.body
        let data_cita= await Cita.findById(req.params.id); //busca algun doc en la collecion por medio del id

        if(!data_cita){
          return res.status(404).json({msg:'NO existe la cita solicitada; no se realiza ninguna actualizacion'})
        }

        // Un cliente solo puede reagendar sus propias citas activas
        const esStaff = ['admin', 'empleado'].includes(req.usuario.rol);
        if(!esStaff && data_cita.email !== req.usuario.email){
            return res.status(403).json({msg:'No puedes modificar una cita que no es tuya.'});
        }
        if(!esStaff && ['cancelada', 'completada'].includes(data_cita.estado)){
            return res.status(400).json({msg:'Esta cita ya no se puede reagendar.'});
        }

        data_cita.nombre = nombre;
        data_cita.fecha = fecha;
        data_cita.hora = hora;
        data_cita.motivo = motivo;

        await data_cita.save();
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
            return res.status(404).json({msj:'la cita no existe BD'})
          }

          // Un cliente solo puede consultar sus propias citas
          const esStaff = ['admin', 'empleado'].includes(req.usuario.rol);
          if(!esStaff && data_cita.email !== req.usuario.email){
            return res.status(403).json({msg:'No puedes ver una cita que no es tuya.'});
          }

          res.json(data_cita);

        } catch (error) {
        console.log(error);
        res.status(500).send('no se puede hacer la consulta');
        }

      }