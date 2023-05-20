const Tinte = require("../models/Tinte");
exports.agregarTinte = async(req, res) =>{

    //console.log('creando el producto desde el controlador');
    //console.log(req.body);

    try {
        let data_tinte;
        data_tinte = new Tinte (req.body);
        await data_tinte.save();
        res.send(data_tinte)
    } catch (error) { 
        console.log(error)
        res.status(500).send('upss...error en la API :(')
    }
}

exports.consultarTintes = async(req, res) =>{
    try {
        const mis_tintes= await Tinte.find();
        res.json(mis_tintes)

    } catch (error) {
        
        console.log(error)
        res.status(500).send('no se puede consultar la informacion')
    }
}

exports.actualizarTinte = async(req,res) =>{
    try {
       
        console.log(req.body)
        const {color,numero,categoria} = req.body
        let data_tinte= await Tinte.findById(req.params.id); //busca algun doc en la collecion por medio del id
        console.log(data_tinte)

        if(!data_tinte){

          res.status(404 ).json({msg:'NO existe el tinte solicitado; nose realiza ninguna actualizacion'})
        }

        data_tinte.color = color;
        data_tinte.numero = numero;
        data_tinte.categoria = categoria;

        data_tinte = await Tinte.findOneAndUpdate({_id:req.params.id}, data_tinte,{new:true})
        res.json(data_tinte);

    } catch (error) {
        console.log(error)
        res.status(500).send('no se puede actualizar contactese con el administrador')
    }

}

exports.eliminarTinte = async(req,res)=> {

  try {
    let data_tinte= await Tinte.findById(req.params.id)
    
    if(!data_tinte){
      res.status(404).json({msj:'no existe el tinte a eliminar en la BD'})
    }

    await Tinte.findOneAndRemove({_id:req.params.id});
    res.json({msj:'Tinte eliminado correctamente'})
  } catch (error) {
    console.log(error)
    res.status(500).send('el dato no se puede eliminar');
    }
  }


  exports.encontrarTinte = async(req,res)=>{
    try {
      let data_tinte= await Tinte.findById(req.params.id);

      if(!data_tinte){
        res.status(404).json({msj:'el tinte no existe BD'})
      }

      res.json(data_tinte);

    } catch (error) {
      console.log(error);
      res.status(500).send('no se puede hacer la consulta');
    }

  }