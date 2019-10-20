var express = require('express');
var router = express.Router();
const { tuneRecipe } = require('../controllers/tuningController')
const { schemas, validateBody } = require('../helpers/routeHelpers')


/* GET home page. */
router.post('/:id', validateBody(schemas.tuningSchema), tuneRecipe);

module.exports = router;
