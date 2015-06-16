var db = require('../db');

var Item = db.model('Item', {
    name: {type: String, required: true},
    category: {type: String, required: true},
    brand: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

module.exports = Item;
