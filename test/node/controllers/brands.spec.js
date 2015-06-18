var jwt = require('jwt-simple');
var jwtSecret = require('../../../node/secrets').jwt;
var expect = require('chai').expect;
var _ = require('lodash');

var api = require('../support/api');
var util = require('../support/util');

describe('controllers.brands', function () {
    describe('GET /api/brands', function () {
        it('should return 200 and a JSON array', function (done) {
            api.get('/api/brands')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function (response) {
                    var brands = response.body;
                    expect(brands).to.be.an('array');
                })
                .end(done);
        });
    });

    describe('POST /api/brands', function () {
        it('should give 401 with no token', function (done) {
            api.post('/api/brands')
                .expect(401, done);
        });

        it('should give 401 with "user" token', function (done) {
            var userRoleToken = jwt.encode({role: 'user'}, jwtSecret);

            api.post('/api/brands')
                .set('x-auth', userRoleToken)
                .expect(401, done);
        });

        it('should give 201 and a new brand with admin token', function (done) {
            var randomName = util.guid();
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.post('/api/brands')
                .send({
                    name: randomName
                })
                .set('x-auth', adminRoleToken)
                .expect(201)
                .expect(function (response) {
                    var brand = response.body;
                    expect(brand.name).to.equal(randomName);
                })
                .end(done);
        });

        it('should give 400 with admin token but no data', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.post('/api/brands')
                .set('x-auth', adminRoleToken)
                .expect(400, done);
        });

        it('should give 400 with admin token but empty name', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.post('/api/brands')
                .send({
                    name: ''
                })
                .set('x-auth', adminRoleToken)
                .expect(400, done);
        });

        it('should give 400 with admin token but object as name', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.post('/api/brands')
                .send({
                    name: {}
                })
                .set('x-auth', adminRoleToken)
                .expect(400, done);
        });
    });

    describe('DELETE /api/brands/:id', function () {
        var brand;

        beforeEach(function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.post('/api/brands')
                .send({
                    name: util.guid()
                })
                .set('x-auth', adminRoleToken)
                .expect(function (response) {
                    brand = response.body;
                })
                .expect(201, done);
        });

        it('should give 401 with no token', function (done) {
            api.delete('/api/brands/' + brand._id)
                .expect(401, done);
        });

        it('should give 401 with "user" token', function (done) {
            var userRoleToken = jwt.encode({role: 'user'}, jwtSecret);

            api.delete('/api/brands/' + brand._id)
                .set('x-auth', userRoleToken)
                .expect(401, done);
        });

        it('should give 200 with "admin" token', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.delete('/api/brands/' + brand._id)
                .set('x-auth', adminRoleToken)
                .expect(200, done);
        });

        it('should give 404 with "admin" token but wrong (valid) id', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            // reversed Id very likely never exists in the database.
            var nonexistentId = _(brand._id.split("")).reverse().value().join("");

            api.delete('/api/brands/' + nonexistentId)
                .set('x-auth', adminRoleToken)
                .expect(404, done);
        });

        it('should give 404 with "admin" token but badly formatted id', function (done) {
            var adminRoleToken = jwt.encode({role: 'admin'}, jwtSecret);

            api.delete('/api/brands/' + util.guid())
                .set('x-auth', adminRoleToken)
                .expect(400, done);
        });
    });
});
