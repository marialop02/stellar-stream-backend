const { Router } = require('express');
const { createType, listTypes, updateType, deleteType } = require('../controllers/typeController');

const router = Router();

router.post('/', createType);
router.get('/', listTypes);
router.put('/:id', updateType);
router.delete('/:id', deleteType);

module.exports = router;
