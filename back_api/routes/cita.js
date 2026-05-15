const express = require('express');
const citaControllers = require('../controllers/citaControllers');
const { proteger, autorizar } = require('../middleware/auth');

const router_app = express.Router();

// Crear cita: público (cualquier visitante puede agendar)
router_app.post('/', citaControllers.reservarCita);

// Ver todas las citas: solo admin y empleado
router_app.get('/', proteger, autorizar('admin', 'empleado'), citaControllers.consultarCitas);

// Ver, editar y eliminar cita por ID: solo admin y empleado
router_app.get('/:id', proteger, autorizar('admin', 'empleado'), citaControllers.encontrarCita);
router_app.put('/:id', proteger, autorizar('admin', 'empleado'), citaControllers.actualizarCita);
router_app.delete('/:id', proteger, autorizar('admin', 'empleado'), citaControllers.eliminarCita);

module.exports = router_app;
