var router = require('express').Router();

router.use('/categories', require('./categories'));
router.use('/brands', require('./brands'));

module.exports = router;
