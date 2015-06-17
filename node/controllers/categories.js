var router = require('express').Router();

var Category = require('../models/category');

router.get('/', function (req, res) {
    Category.find()
        .sort('-created')
        .exec(function (err, categories) {
            return res.json(categories);
        });
});

router.post('/', function (req, res) {
    var newCategory = new Category(req.body);

    if (!newCategory.name) {
        return res.status(400).send('New category must contain {name}');
    }

    newCategory.nameLowercase = newCategory.name.toLowerCase();

    // see if it exists
    Category.findOne({nameLowercase: newCategory.nameLowercase}, function (err, collision) {
        if (collision) {
            console.log('collision', collision);
            return res.status(412).send('A category with the name "' + collision.name + '" already exists.');
        }

        newCategory.save(function () {
            return res.status(201).send(newCategory);
        });
    });

});

router.delete('/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
