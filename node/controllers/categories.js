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

    newCategory.save(function () {
        return res.status(201).send(newCategory);
    });
});

router.delete('/:id', function (req, res) {
    Category.findByIdAndRemove(req.params.id, function () {
        return res.status(200).send();
    });
});

module.exports = router;
