const mongoose = require('mongoose');
const { Schema } = mongoose;

const GenreSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
    descripcion: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Genre', GenreSchema);
