const Director = require('../models/Director');

exports.createDirector = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Director.findOne({ nombre: req.body.nombre });
        if (exists) {
            return res.status(400).json({ message: 'Error: El director ya existe' });
        }

        const director = new Director(req.body);
        await director.save();
        res.status(201).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listDirectors = async (req, res) => {
    try {
        const directors = await Director.find();
        res.status(200).json(directors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateDirector = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Director.findOne({ nombre: req.body.nombre, _id: { $ne: req.params.id } });
        if (exists) {
            return res.status(400).json({ message: 'Error: Ya existe otro director con este nombre' });
        }

        const director = await Director.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!director) return res.status(404).json({ message: 'Director no encontrado' });
        res.status(200).json(director);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
