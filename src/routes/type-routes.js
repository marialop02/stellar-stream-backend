const { Router } = require('express');
const { createType, listTypes, updateType } = require('../controllers/typeController');

const router = Router();

router.post('/', createType);
router.get('/', listTypes);
router.put('/:id', updateType);

module.exports = router;
