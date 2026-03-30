const Producer = require('../models/Producer');

exports.createProducer = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Producer.findOne({ nombre: req.body.nombre });
        if (exists) {
            return res.status(400).json({ message: 'Error: La productora ya existe' });
        }

        const producer = new Producer(req.body);
        await producer.save();
        res.status(201).json(producer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listProducers = async (req, res) => {
    try {
        const producers = await Producer.find();
        res.status(200).json(producers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProducer = async (req, res) => {
    try {
        if (!req.body.nombre || req.body.nombre.trim() === '') {
            return res.status(400).json({ message: 'Error: El nombre es obligatorio' });
        }

        const exists = await Producer.findOne({ nombre: req.body.nombre, _id: { $ne: req.params.id } });
        if (exists) {
            return res.status(400).json({ message: 'Error: Ya existe otra productora con este nombre' });
        }

        const producer = await Producer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producer) return res.status(404).json({ message: 'Productora no encontrada' });
        res.status(200).json(producer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
