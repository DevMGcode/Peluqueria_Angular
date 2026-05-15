const express = require('express');
const tinteControllers = require('../controllers/tinteControllers');
const { proteger, autorizar } = require('../middleware/auth');

const router_app = express.Router();

// Ver tintes: público
router_app.get('/', tinteControllers.consultarTintes);
router_app.get('/:id', tinteControllers.encontrarTinte);

// Crear, editar y eliminar: solo admin y empleado
router_app.post('/', proteger, autorizar('admin', 'empleado'), tinteControllers.agregarTinte);
router_app.put('/:id', proteger, autorizar('admin', 'empleado'), tinteControllers.actualizarTinte);
router_app.delete('/:id', proteger, autorizar('admin', 'empleado'), tinteControllers.eliminarTinte);

module.exports = router_app;
