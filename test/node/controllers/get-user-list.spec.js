var jwt = require('jwt-simple');
var jwtSecret = require('../../../node/secrets').jwt;
var expect = require('chai').expect;

var api = require('../support/api');
var util = require('../support/util');

describe('GET /api/users', function () {
    it('should give 401 without a token', function (done) {
        api.get('/api/users')
            .expect(401, done);
    });

    it('should give 401 if the user is just a "user"', function (done) {
        var userRoleToken = jwt.encode({role: 'user'}, jwtSecret);

        api.get('/api/users')
            .set('x-auth', userRoleToken)
            .expect(401, done);
    });

    it('should give 401 if the user has an unknown role', function (done) {
        var unknownRole = util.guid();
        var unknownRoleToken = jwt.encode({role: unknownRole}, jwtSecret);

        api.get('/api/users')
            .set('x-auth', unknownRoleToken)
            .expect(401, done);
    });

    it('should give 200 and an array if the user is an "admin"', function (done) {
        var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

        api.get('/api/users')
            .set('x-auth', adminRoleToken)
            .expect(200)
            .expect(function (users) {
                expect(users.body).to.be.an('array');
            })
            .end(done);
    });
});
