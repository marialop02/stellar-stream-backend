const mongoose = require('mongoose');
const { Schema } = mongoose;

const MediaSchema = new Schema({
    serial: {
        type: String,
        required: true,
        unique: true
    },
    titulo: {
        type: String,
        required: true
    },
    sinopsis: {
        type: String
    },
    url: {
        type: String,
        required: true,
        unique: true
    },
    imagen: {
        type: String
    },
    anioEstreno: {
        type: Number
    },
    genero: {
        type: Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'Director',
        required: true
    },
    productora: {
        type: Schema.Types.ObjectId,
        ref: 'Producer',
        required: true
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: 'Type',
        required: true
    }
}, {
    timestamps: true
});

MediaSchema.pre('validate', async function (next) {
    if (this.isNew && !this.serial) {
        try {
            const lastMedia = await this.constructor.findOne({}, 'serial')
                                        .sort({ createdAt: -1 });
            
            let nextNum = 1;
            if (lastMedia && lastMedia.serial) {
                const parts = lastMedia.serial.split('-');
                if (parts.length === 2 && !isNaN(parts[1])) {
                    nextNum = parseInt(parts[1], 10) + 1;
                }
            }
            
            this.serial = `PEL-${nextNum.toString().padStart(4, '0')}`;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

module.exports = mongoose.model('Media', MediaSchema, 'media');
