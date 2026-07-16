
const mongoose = require('mongoose');

const CitaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
        },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        default: ''
        },
    fecha:{
        type:String,
        required: true
        },
    hora:{
        type:String,
        required: true
        },
    motivo:{
        type:String,
        required: true
            },
    estado:{
        type:String,
        enum: ['pendiente', 'confirmada', 'cancelada', 'completada'],
        default: 'pendiente'
        },
    fec_cre:{
        type:Date,
        default: Date.now()
        }        



})

module.exports = mongoose.model('Cita',CitaSchema) 