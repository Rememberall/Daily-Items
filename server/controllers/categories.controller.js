var router = require('express').Router();
var Category = require('../models/category');

router.get('/', function (req, res, next) {
    Category.find(function (err, categories) {
        if (err) return next(err);
        return res.json(categories);
    });
});

router.post('/', function (req, res, next) {
    var newCategory = req.body;
    newCategory.products = [];

    var category = new Category(newCategory);
    category.save(function (err) {
        if (err) return next(err);
        return res.status(201).json(category);
    });
});

router.delete('/:id', function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, function (err, removedCategory) {
        if (err) return next(err);
        if (!removedCategory) return res.status(404).send('No such category');
        return res.status(200).send();
    });
});

module.exports = router;
