var db = require('../db');
var Product = require('./product');

var Category = db.model('Category', {
    name: { type: String, required: true },
    products: [Product.schema]
});

module.exports = Category;
