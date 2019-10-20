const express = require('express');
const router = express.Router();
const { modify, addToFavorites, deleteFromFavorites } =require('../controllers/profileController')
const {schemas,validateBody} = require('../helpers/routeHelpers')

router.put('/:id', validateBody(schemas.profileSchema),modify);
router.post('/:id', validateBody(schemas.favoriteSchema),addToFavorites)
router.delete('/:id', validateBody(schemas.favoriteSchema),deleteFromFavorites)

module.exports = router;
