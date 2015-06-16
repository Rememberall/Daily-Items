var router = require('express').Router();

router.use('/categories', require('./categories'));

module.exports = router;
