
const mongoose = require('mongoose');

const TinteSchema = mongoose.Schema({
    color:{
        type:String,
        required: true
        },
    numero:{
        type:String,
        required: true
        },
    categoria:{
        type:String,
        required: true
        },
    fec_cre:{
        type:Date,
        default: Date.now()
        }        



})

module.exports = mongoose.model('tinte',TinteSchema) 