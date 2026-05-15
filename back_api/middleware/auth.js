const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

exports.proteger = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ msg: 'Acceso denegado. No hay token.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id).select('-password');

        if (!req.usuario || !req.usuario.activo) {
            return res.status(401).json({ msg: 'Token inválido o usuario inactivo.' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ msg: 'Token inválido o expirado.' });
    }
};

exports.autorizar = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.usuario.rol)) {
            return res.status(403).json({
                msg: `El rol '${req.usuario.rol}' no tiene permiso para esta acción.`
            });
        }
        next();
    };
};
