var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/', express.static(__dirname + '/../angular'));

app.use('/api', bodyParser.json());
app.use('/api', require('./controllers'));

app.listen('3693');
