var jwt = require('jwt-simple');
var jwtSecret = require('../../../node/secrets').jwt;
var expect = require('chai').expect;
var _ = require('lodash');

var api = require('../support/api');
var util = require('../support/util');

describe('controllers.users', function () {
    describe('DELETE /api/users', function () {
        var user;

        beforeEach(function (done) {
            var randomEmail = util.guid();
            var randomPassword = util.guid();

            api.post('/api/users')
                .send({
                    email: randomEmail,
                    password: randomPassword
                })
                .expect(201)
                .expect(function (response) {
                    user = response.body;
                })
                .end(done);
        });

        it('should return 200 and a JSON object', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.delete('/api/users/' + user._id)
                .set('x-auth', adminRoleToken)
                .expect(200)
                .expect(function (response) {
                    var user = response.body;
                    expect(user).to.be.an('object');
                })
                .end(done);
        });
    });
});
