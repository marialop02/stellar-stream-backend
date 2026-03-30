const Media = require('../models/Media');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Producer = require('../models/Producer');
const Type = require('../models/Type');

exports.createMedia = async (req, res) => {
    try {
        const { url, genero, director, productora, tipo } = req.body;
        
        // 1. Validar unicidad explícita para url (El serial se autogenera)
        const urlExists = await Media.findOne({ url });
        if (urlExists) {
            return res.status(400).json({ message: 'Error: La URL ya se encuentra registrada' });
        }

        // 2. Validar que las entidades relacionadas existan y sean 'Activas'
        if (genero) {
            const genreDoc = await Genre.findById(genero);
            if (!genreDoc || genreDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: El género suministrado no existe o se encuentra inactivo' });
            }
        }
        if (director) {
            const directorDoc = await Director.findById(director);
            if (!directorDoc || directorDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: El director suministrado no existe o se encuentra inactivo' });
            }
        }
        if (productora) {
            const producerDoc = await Producer.findById(productora);
            if (!producerDoc || producerDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: La productora suministrada no existe o se encuentra inactiva' });
            }
        }
        if (tipo) {
            const typeDoc = await Type.findById(tipo);
            if (!typeDoc) {
                return res.status(400).json({ message: 'Error: El tipo suministrado no existe' });
            }
        }

        // 3. Crear el documento
        const data = { ...req.body };
        delete data.serial; // Forzar generación
        
        const media = new Media(data);
        await media.save();
        res.status(201).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listMedia = async (req, res) => {
    try {
        const media = await Media.find()
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMediaById = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id)
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');
        if (!media) return res.status(404).json({ message: 'Media no encontrada' });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateMedia = async (req, res) => {
    try {
        const { url, genero, director, productora } = req.body;

        if (url) {
            const uExist = await Media.findOne({ url, _id: { $ne: req.params.id } });
            if (uExist) return res.status(400).json({ message: 'Error: La URL pertenece a otra producción' });
        }

        if (genero) {
            const genreDoc = await Genre.findById(genero);
            if (!genreDoc || genreDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: El género es inválido o se encuentra Inactivo' });
            }
        }
        if (director) {
            const directorDoc = await Director.findById(director);
            if (!directorDoc || directorDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: El director es inválido o se encuentra Inactivo' });
            }
        }
        if (productora) {
            const producerDoc = await Producer.findById(productora);
            if (!producerDoc || producerDoc.estado !== 'Activo') {
                return res.status(400).json({ message: 'Error: La productora es inválida o se encuentra Inactiva' });
            }
        }
        if (tipo) {
            const typeDoc = await Type.findById(tipo);
            if (!typeDoc) {
                return res.status(400).json({ message: 'Error: El tipo es inválido o no existe' });
            }
        }

        const updateData = { ...req.body };
        delete updateData.serial; // Inmutable en ediciones

        const media = await Media.findByIdAndUpdate(req.params.id, updateData, { new: true })
            .populate('genero')
            .populate('director')
            .populate('productora')
            .populate('tipo');
            
        if (!media) return res.status(404).json({ message: 'Media no encontrada' });
        res.status(200).json(media);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) return res.status(404).json({ message: 'Media no encontrada' });
        res.status(200).json({ message: 'Media eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
