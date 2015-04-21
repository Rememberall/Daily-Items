var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rememberall');

module.exports = mongoose;
