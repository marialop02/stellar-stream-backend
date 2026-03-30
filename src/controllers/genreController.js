const Genre = require('../models/Genre');

exports.createGenre = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Genre.findOne({ nombre: req.body.nombre });
        if (exists) {
            return res.status(400).json({ message: 'Error: El género ya existe' });
        }

        const genre = new Genre(req.body);
        await genre.save();
        res.status(201).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Genre.findOne({ nombre: req.body.nombre, _id: { $ne: req.params.id } });
        if (exists) {
            return res.status(400).json({ message: 'Error: Ya existe otro género con este nombre' });
        }

        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genre) return res.status(404).json({ message: 'Género no encontrado' });
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
