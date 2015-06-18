var jwt = require('jwt-simple');
var jwtSecret = require('../../../node/secrets').jwt;
var expect = require('chai').expect;

var api = require('../support/api');
var util = require('../support/util');

describe('collisions', function () {
    describe('for users', function () {
        var userToDuplicate;

        beforeEach(function (done) {
            var randomEmail = util.guid().toLowerCase();
            var randomPassword = util.guid().toLowerCase();

            userToDuplicate = {
                email: randomEmail,
                password: randomPassword
            };

            api.post('/api/users')
                .send(userToDuplicate)
                .expect(201, done);
        });

        it('should occur if an email is already registered', function (done) {
            api.post('/api/users')
                .send(userToDuplicate)
                .expect(412, done);
        });

        it('should occur if an email with different casing is already registered', function (done) {
            api.post('/api/users')
                .send({
                    email: userToDuplicate.email.toUpperCase(),
                    password: userToDuplicate.password
                })
                .expect(412, done);
        });
    });
});
