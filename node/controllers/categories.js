var router = require('express').Router();

var accessLevels = require('../access-levels');
var Category = require('../models/category');

router.get('/', function (req, res) {
    Category.find()
        .sort('-created')
        .exec(function (err, categories) {
            return res.json(categories);
        });
});

router.post('/', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    if (!req.body.name) {
        return res.status(400).send('New category must contain {name}');
    }

    if (typeof req.body.name !== 'string') {
        return res.status(400).send('Category name must be string');
    }

    var newCategory = new Category(req.body);

    newCategory.nameLowercase = newCategory.name.toLowerCase();

    // see if it exists
    Category.findOne({nameLowercase: newCategory.nameLowercase}, function (err, collision) {
        if (collision) {
            return res.status(412).send('A category with the name "' + collision.name + '" already exists.');
        }

        newCategory.save(function () {
            return res.status(201).send(newCategory);
        });
    });

});

router.delete('/:id', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    Category.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
