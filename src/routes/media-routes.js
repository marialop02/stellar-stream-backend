const { Router } = require('express');
const { createMedia, listMedia, updateMedia, deleteMedia, getMediaById } = require('../controllers/mediaController');

const router = Router();

router.post('/', createMedia);
router.get('/', listMedia);
router.get('/:id', getMediaById);
router.put('/:id', updateMedia);
router.delete('/:id', deleteMedia);

module.exports = router;
