var router = require('express').Router();

var Product = require('../models/product');
var Category = require('../models/category');

router.get('/', function (req, res, next) {
    Product.find(function (err, products) {
        if (err) return next(err);
        return res.json(products);
    });
});

router.post('/', function (req, res, next) {
    var product = new Product(req.body);
    product.save(function(err) {
        if (err) return next(err);

        Category.findOne({name: product.category}, function (err, matchedCategory) {
            if (err) return next(err);

            var category = matchedCategory || new Category({name: product.category, products: []});

            category.products.push(product);
            category.save(function(err) {
                if (err) return next(err);
                return res.status(201).json(product);
            });
        });
    });
});

module.exports = router;
