var expect = require('chai').expect;
var jwt = require('jwt-simple');
var jwtSecret = require('../../../node/secrets').jwt;

var api = require('../support/api');
var util = require('../support/util');

describe('register and log in', function () {
    it('should create a user and log in', function (done) {
        var randomEmail = util.guid();
        var randomPassword = util.guid();

        api.post('/api/users')
            .send({
                email: randomEmail,
                password: randomPassword
            })
            .expect(201)
            .expect(function (response) {
                var user = response.body;
                expect(user.email).to.equal(randomEmail);
            })
            .end(function () {
                api.post('/api/sessions')
                    .send({
                        email: randomEmail,
                        password: randomPassword
                    })
                    .expect(201)
                    .expect(function (response) {
                        var token = response.body.token;
                        var user = response.body.user;

                        var tokenUser = jwt.decode(token, jwtSecret);

                        expect(user.email).to.equal(randomEmail);
                        expect(user.email).to.equal(tokenUser.email);
                        expect(user.email.toLowerCase()).to.equal(tokenUser.emailLowercase);
                    })
                    .end(done);
            });
    });
});
