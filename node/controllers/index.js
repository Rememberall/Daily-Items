var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(require('../access'));

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/categories', require('./categories'));
router.use('/brands', require('./brands'));
router.use('/items', require('./items'));

module.exports = router;
