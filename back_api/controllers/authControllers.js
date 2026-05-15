const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generarToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

exports.registrar = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { nombre, email, password, telefono } = req.body;

    try {
        const existeUsuario = await Usuario.findOne({ email });
        if (existeUsuario) {
            return res.status(400).json({ msg: 'Ya existe una cuenta con ese email.' });
        }

        const usuario = new Usuario({ nombre, email, password, telefono });
        await usuario.save();

        const token = generarToken(usuario._id);

        res.status(201).json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                telefono: usuario.telefono
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al registrar usuario.' });
    }
};

exports.login = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }

    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario || !usuario.activo) {
            return res.status(401).json({ msg: 'Credenciales inválidas.' });
        }

        const passwordCorrecta = await usuario.compararPassword(password);
        if (!passwordCorrecta) {
            return res.status(401).json({ msg: 'Credenciales inválidas.' });
        }

        const token = generarToken(usuario._id);

        res.json({
            token,
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                telefono: usuario.telefono
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al iniciar sesión.' });
    }
};

exports.perfil = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id).select('-password');
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al obtener perfil.' });
    }
};

exports.listarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password').sort({ fec_cre: -1 });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ msg: 'Error al listar usuarios.' });
    }
};
