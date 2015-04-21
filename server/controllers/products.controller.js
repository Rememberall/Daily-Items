var router = require('express').Router();

router.get('/', function(req, res, next) {
    return res.json('hi');
});

module.exports = router;
