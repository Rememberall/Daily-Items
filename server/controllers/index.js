var router = require('express').Router();

router.use('/products', require('./products.controller.js'));
router.use('/categories', require('./categories.controller.js'));

module.exports = router;
