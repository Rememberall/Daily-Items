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

    describe('for brands', function () {
        var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

        var brandToDuplicate;

        beforeEach(function (done) {
            var randomName = util.guid().toLowerCase();

            brandToDuplicate = {
                name: randomName
            };

            api.post('/api/brands')
                .send(brandToDuplicate)
                .set('x-auth', adminRoleToken)
                .expect(201, done);
        });

        it('should occur if a name is already registered', function (done) {
            api.post('/api/brands')
                .send(brandToDuplicate)
                .set('x-auth', adminRoleToken)
                .expect(412, done);
        });

        it('should occur if a name is already registered with a different casing', function (done) {
            api.post('/api/brands')
                .set('x-auth', adminRoleToken)
                .send({
                    name: brandToDuplicate.name.toUpperCase()
                })
                .expect(412, done);
        });
    });

    describe('for categories', function () {
        var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

        var categoryToDuplicate;

        beforeEach(function (done) {
            var randomName = util.guid().toLowerCase();

            categoryToDuplicate = {
                name: randomName
            };

            api.post('/api/categories')
                .send(categoryToDuplicate)
                .set('x-auth', adminRoleToken)
                .expect(201, done);
        });

        it('should occur if a name is already registered', function (done) {
            api.post('/api/categories')
                .send(categoryToDuplicate)
                .set('x-auth', adminRoleToken)
                .expect(412, done);
        });

        it('should occur if a name is already registered with a different casing', function (done) {
            api.post('/api/categories')
                .set('x-auth', adminRoleToken)
                .send({
                    name: categoryToDuplicate.name.toUpperCase()
                })
                .expect(412, done);
        });
    });
});
