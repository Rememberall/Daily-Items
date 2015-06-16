var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = 2804;

app.use('/', express.static(__dirname + '/../angular'));
app.use('/api', bodyParser.json());
app.use('/api', require('./controllers'));

app.listen(port, function () {
    console.log('App listening on port', port);
});
