var jwt = require('jwt-simple');
var expect = require('chai').expect;

var api = require('../support/api');
var util = require('../support/util');

describe('creating users', function () {
    describe('with missing', function () {
        it('email and password should result in 400', function (done) {
            api.post('/api/users')
                .expect(400, done);
        });

        it('email should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    password: util.guid()
                })
                .expect(400, done);
        });

        it('password should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    email: util.guid()
                })
                .expect(400, done);
        });
    });

    describe('with blank', function () {
        it('email and password should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    email: '',
                    password: ''
                })
                .expect(400, done);
        });

        it('email should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    email: '',
                    password: util.guid()
                })
                .expect(400, done);
        });

        it('password should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    email: util.guid()
                })
                .expect(400, done);
        });
    });

    describe('with objects instead of strings', function () {
        it('for email and password should result in 400', function (done) {
            api.post('/api/users')
                .send({
                    email: {},
                    password: {}
                })
                .expect(400, done);
        });
    });
});
