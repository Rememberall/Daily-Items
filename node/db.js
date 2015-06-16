var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dailyItems');

module.exports = mongoose;
