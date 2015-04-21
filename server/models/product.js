var db = require('../db');

var Product = db.model('Product', {
    name: String,
    manufacturer: String
});

module.exports = Product;
