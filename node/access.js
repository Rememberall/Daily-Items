var jwt = require('jwt-simple');
var jwtSecret = require('./secrets').jwt;

var accessLevels = require('./access-levels');

module.exports = function (req, res, next) {
    var token = req.header('x-auth');

    if (!token) {
        req.accessLevel = accessLevels.unauthorized;
        return next();
    }

    var user = jwt.decode(token, jwtSecret);
    var predefinedLevel = accessLevels[user.role];

    if (!predefinedLevel) {
        req.accessLevel = accessLevels.unauthorized;
        return next();
    }

    req.accessLevel = predefinedLevel;
    req.user = user;
    return next();
};
