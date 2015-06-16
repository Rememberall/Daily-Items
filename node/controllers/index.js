var router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/brands', require('./brands'));
router.use('/items', require('./items'));

module.exports = router;
