var router = require('express').Router();
var bcrypt = require('bcrypt');

var accessLevels = require('../access-levels');
var User = require('../models/user');

router.get('/', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    User.find(function (err, users) {
        return res.json(users);
    });
});

router.post('/', function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('User must contain {email, password}');
    }

    var user = new User(req.body);
    user.role = 'user';

    User.findOne({email: user.email}, function (err, collision) {
        if (collision) {
            return res.status(412).send('That email address is already taken.');
        }

        bcrypt.hash(req.body.password, 10, function (err, passwordHash) {
            user.passwordHash = passwordHash;
            user.save(function () {
                return res.status(201).json(user);
            });
        });
    });
});

module.exports = router;
