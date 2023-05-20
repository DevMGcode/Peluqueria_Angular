//rutas para la gestion de tintes

const express = require ('express');
const tinteControllers  = require('../controllers/tinteControllers');
const router_app = express.Router();

// el path al que accedera el usuario para ejecutar este metodo [/api/agregartinte]

//router_app.post('/', ()=>{
//    console.log('agregando tinte...');
//})

router_app.post('/',tinteControllers.agregarTinte);
router_app.get('/',tinteControllers.consultarTintes);
router_app.put('/:id',tinteControllers.actualizarTinte);
router_app.delete('/:id',tinteControllers.eliminarTinte);
router_app.get('/:id',tinteControllers.encontrarTinte);
module.exports= router_app;