var router = require('express').Router();

var accessLevels = require('../access-levels');
var Brand = require('../models/brand');

router.get('/', function (req, res) {
    Brand.find()
        .sort('-created')
        .exec(function (err, brands) {
            return res.json(brands);
        });
});

router.post('/', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    var newBrand = new Brand(req.body);

    if (!newBrand.name) {
        return res.status(400).send('New brand must contain {name}');
    }

    newBrand.nameLowercase = newBrand.name.toLowerCase();

    // see if it exists
    Brand.findOne({nameLowercase: newBrand.nameLowercase}, function (err, collision) {
        if (collision) {
            return res.status(412).send('A brand with the name "' + collision.name + '" already exists.');
        }

        newBrand.save(function () {
            return res.status(201).send(newBrand);
        });
    });
});

router.delete('/:id', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    Brand.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
