var db = require('../db');

var Product = db.model('Product', {
    name: String,
    manufacturer: String,
    category: String
});

module.exports = Product;
