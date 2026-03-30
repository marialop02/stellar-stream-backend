const mongoose = require('mongoose');
const { Schema } = mongoose;

const TypeSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Type', TypeSchema);
