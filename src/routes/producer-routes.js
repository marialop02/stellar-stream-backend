const { Router } = require('express');
const { createProducer, listProducers, updateProducer } = require('../controllers/producerController');

const router = Router();

router.post('/', createProducer);
router.get('/', listProducers);
router.put('/:id', updateProducer);

module.exports = router;
