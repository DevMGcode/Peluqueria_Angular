const express = require('express');
const { check } = require('express-validator');
const { registrar, login, perfil, listarUsuarios } = require('../controllers/authControllers');
const { proteger, autorizar } = require('../middleware/auth');

const router = express.Router();

router.post('/registrar', [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('email', 'Ingresa un email válido').isEmail(),
    check('password', 'La contraseña debe tener mínimo 6 caracteres').isLength({ min: 6 })
], registrar);

router.post('/login', [
    check('email', 'Ingresa un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty()
], login);

router.get('/perfil', proteger, perfil);

router.get('/usuarios', proteger, autorizar('admin'), listarUsuarios);

module.exports = router;
