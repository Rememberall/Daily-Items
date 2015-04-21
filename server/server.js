var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/../angular'));

app.listen('3693');
