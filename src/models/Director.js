const mongoose = require('mongoose');
const { Schema } = mongoose;

const DirectorSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Director', DirectorSchema);
