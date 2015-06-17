var router = require('express').Router();

var accessLevels = require('../access-levels');
var Item = require('../models/item');

router.get('/', function (req, res) {
    Item.find()
        .sort('-created')
        .exec(function (err, items) {
            return res.json(items);
        });
});

router.post('/', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    var newItem = new Item(req.body);

    if (!newItem.name || !newItem.category || !newItem.brand) {
        return res.status(400).send('New item must contain {name, category, brand}');
    }

    newItem.nameLowercase = newItem.name.toLowerCase();

    // see if it exists
    Item.findOne({nameLowercase: newItem.nameLowercase}, function (err, collision) {
        if (collision) {
            return res.status(412).send('An item with the name "' + collision.name + '" already exists.');
        }

        newItem.save(function () {
            return res.status(201).send(newItem);
        });
    });
});

router.delete('/:id', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    Item.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
