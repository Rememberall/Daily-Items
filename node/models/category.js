var db = require('../db');

var Category = db.model('Category', {
    name: {type: String, required: true},
    nameLowercase: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

module.exports = Category;
