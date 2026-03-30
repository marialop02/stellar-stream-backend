const { Router } = require('express');
const { createDirector, listDirectors, updateDirector } = require('../controllers/directorController');

const router = Router();

router.post('/', createDirector);
router.get('/', listDirectors);
router.put('/:id', updateDirector);

module.exports = router;
