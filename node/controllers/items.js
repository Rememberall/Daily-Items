var router = require('express').Router();

var Item = require('../models/item');

router.get('/', function (req, res) {
    Item.find()
        .sort('-created')
        .exec(function (err, items) {
            return res.json(items);
        });
});

router.post('/', function (req, res) {
    var newItem = new Item(req.body);

    if (!newItem.name || !newItem.category || !newItem.brand) {
        return res.status(400).send('New item must contain {name, category}');
    }

    newItem.save(function () {
        return res.status(201).send(newItem);
    });
});

router.delete('/:id', function (req, res) {
    Item.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
