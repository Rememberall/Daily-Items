var router = require('express').Router();

router.use('/users', require('./users'));
router.use('/sessions', require('./sessions'));
router.use('/categories', require('./categories'));
router.use('/brands', require('./brands'));
router.use('/items', require('./items'));

module.exports = router;
