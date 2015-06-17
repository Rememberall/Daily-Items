var router = require('express').Router();
var bcrypt = require('bcrypt');
var jwt = require('jwt-simple');

var jwtSecret = require('../secrets').jwt;
var User = require('../models/user');


router.post('/', function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send('User must contain {email, password}');
    }

    User.findOne({email: req.body.email})
        .select('passwordHash')
        .exec(function (err, user) {
            if (!user) {
                return res.status(401).send('Email or password is incorrect.');
            }

            bcrypt.compare(req.body.password, user.passwordHash, function (err, match) {
                if (!match) {
                    return res.status(401).send('Email or password is incorrect.');
                }

                var token = jwt.encode(user, jwtSecret);
                delete user.passwordHash;
                return res.status(201).send({
                    token: token,
                    user: user
                });
            });
        });
});

router.get('/refresh', function (req, res) {
    var token = req.header('x-auth');
    if (!token) {
        return res.sendStatus(401);
    }

    var tokenUser = jwt.decode(token, jwtSecret);

    User.findOne({email: tokenUser.email}, function (err, user) {
        return res.json(user);
    });
});

module.exports = router;
