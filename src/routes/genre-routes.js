const { Router } = require('express');
const { createGenre, listGenres, updateGenre } = require('../controllers/genreController');

const router = Router();

router.post('/', createGenre);
router.get('/', listGenres);
router.put('/:id', updateGenre);

module.exports = router;
