var db = require('../db');

var User = db.model('User', {
    email: {type: String, required: true, select: true},
    emailLowercase: {type: String, required: true, select: true},
    passwordHash: {type: String, required: true, select: false},
    role: {type: String, required: true, select: true},
    created: {type: Date, default: Date.now, select: true}
});

module.exports = User;
