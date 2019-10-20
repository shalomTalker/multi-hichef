var express = require('express');
var router = express.Router();
const { modify } = require('../controllers/coreController')
const { schemas, validateBody } = require('../helpers/routeHelpers')

const httpProxy = require('express-http-proxy')

/* GET home page. */
router.put('/:id', validateBody(schemas.coreSchema), modify);
module.exports = router;
