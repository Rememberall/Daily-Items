var router = require('express').Router();

var Brand = require('../models/brand');

router.get('/', function (req, res) {
    Brand.find()
        .sort('-created')
        .exec(function (err, brands) {
            return res.json(brands);
        });
});

router.post('/', function (req, res) {
    var newBrand = new Brand(req.body);

    newBrand.save(function () {
        return res.status(201).send(newBrand);
    });
});

router.delete('/:id', function (req, res) {
    Brand.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
