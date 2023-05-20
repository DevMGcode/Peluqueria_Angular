
const mongoose = require('mongoose');

const CitaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
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
    fec_cre:{
        type:Date,
        default: Date.now()
        }        



})

module.exports = mongoose.model('Cita',CitaSchema) 