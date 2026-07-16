const express = require('express');
const citaControllers = require('../controllers/citaControllers');
const { proteger, autorizar } = require('../middleware/auth');

const router_app = express.Router();

// Crear cita: público (cualquier visitante puede agendar)
router_app.post('/', citaControllers.reservarCita);

// Ver todas las citas: solo admin y empleado
router_app.get('/', proteger, autorizar('admin', 'empleado'), citaControllers.consultarCitas);

// Ver mis citas: cualquier usuario autenticado (filtra por su email)
router_app.get('/mias', proteger, citaControllers.misCitas);

// Cancelar cita: el dueño de la cita (o admin/empleado). Cambia estado, no borra.
router_app.put('/:id/cancelar', proteger, citaControllers.cancelarCita);

// Ver y reagendar cita por ID: el dueño de la cita o admin/empleado (validado en el controlador)
router_app.get('/:id', proteger, citaControllers.encontrarCita);
router_app.put('/:id', proteger, citaControllers.actualizarCita);

// Eliminar cita: SOLO admin y empleado (el cliente cancela, nunca borra)
router_app.delete('/:id', proteger, autorizar('admin', 'empleado'), citaControllers.eliminarCita);

module.exports = router_app;
