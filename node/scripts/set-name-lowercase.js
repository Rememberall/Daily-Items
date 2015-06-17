var Brand = require('../models/brand');
var Category = require('../models/category');
var Item = require('../models/item');

Brand.find(function(err, brands) {
    brands.forEach(function(brand) {
        brand.nameLowercase = brand.name.toLowerCase();
        brand.save();
    });
});

Category.find(function(err, categories) {
    categories.forEach(function(category) {
        category.nameLowercase = category.name.toLowerCase();
        category.save();
    });
});

Item.find(function(err, items) {
    items.forEach(function(item) {
        item.nameLowercase = item.name.toLowerCase();
        item.save();
    });
});
