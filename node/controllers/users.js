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

    if (typeof req.body.email !== 'string' || typeof req.body.password !== 'string') {
        return res.status(400).send('{email, password} must both be strings.');
    }

    var user = new User(req.body);
    user.role = 'user';
    user.emailLowercase = user.email.toLowerCase();

    User.findOne({emailLowercase: user.email.toLowerCase()}, function (err, collision) {
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

router.delete('/:id', function (req, res) {
    if (req.accessLevel < accessLevels.admin) {
        return res.sendStatus(401);
    }

    if (!/^[0-9a-fA-F]{24}$/.test(req.params.id)) {
        return res.status(400).send('id must be a valid ObjectId.');
    }

    User.findById(req.params.id, function (err, user) {
        if (!user) {
            return res.status(404).send('No such user was found.');
        }

        user.remove(function () {
            return res.json(user);
        });
    });
});

module.exports = router;
