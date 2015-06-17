var db = require('../db');

var Brand = db.model('Brand', {
    name: {type: String, required: true},
    nameLowercase: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

module.exports = Brand;
