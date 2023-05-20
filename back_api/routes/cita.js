const express = require ('express');
const citaControllers = require('../controllers/citaControllers');
const router_app = express.Router();// vaya enlaceme y guardeme de express en router para poder enlazar la aplicacion



router_app.post('/', citaControllers.reservarCita);
router_app.get('/',citaControllers.consultarCitas);
router_app.put('/:id',citaControllers.actualizarCita);
router_app.delete('/:id',citaControllers.eliminarCita);
router_app.get('/:id',citaControllers.encontrarCita);

module.exports= router_app;