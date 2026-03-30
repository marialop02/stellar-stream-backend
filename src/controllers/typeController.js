const Type = require('../models/Type');

exports.createType = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Type.findOne({ nombre: req.body.nombre });
        if (exists) {
            return res.status(400).json({ message: 'Error: El tipo ya existe' });
        }

        const type = new Type(req.body);
        await type.save();
        res.status(201).json(type);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listTypes = async (req, res) => {
    try {
        const types = await Type.find();
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateType = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Type.findOne({ nombre: req.body.nombre, _id: { $ne: req.params.id } });
        if (exists) {
            return res.status(400).json({ message: 'Error: Ya existe otro tipo con este nombre' });
        }

        const type = await Type.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!type) return res.status(404).json({ message: 'Tipo no encontrado' });
        res.status(200).json(type);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteType = async (req, res) => {
    try {
        const type = await Type.findByIdAndDelete(req.params.id);
        if (!type) {
            return res.status(404).json({ message: 'Tipo no encontrado' });
        }
        res.status(200).json({ message: 'Tipo eliminado exitosamente', type });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
