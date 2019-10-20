var express = require('express');
var router = express.Router();
const { filterRecipe } = require('../controllers/filterController')


/* GET home page. */
router.get('/:id', filterRecipe);
// router.get('/', modify);
module.exports = router;
