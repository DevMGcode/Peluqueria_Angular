const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UsuarioSchema = mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    rol: { type: String, enum: ['admin', 'empleado', 'cliente'], default: 'cliente' },
    telefono: { type: String, trim: true },
    activo: { type: Boolean, default: true },
    fec_cre: { type: Date, default: Date.now }
});

UsuarioSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UsuarioSchema.methods.compararPassword = async function (passwordIngresado) {
    return await bcrypt.compare(passwordIngresado, this.password);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
