const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProducerSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    slogan: {
        type: String
    },
    descripcion: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Producer', ProducerSchema);
