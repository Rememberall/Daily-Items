var request = require('supertest');
var express = require('express');
var router = require('../../../node/controllers');

var app = express();
app.use('/api', router);

module.exports = request(app);
