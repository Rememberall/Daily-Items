var morgan = require('morgan');
var express = require('express');
var app = express();

var port = process.env.PORT || 2804;

app.use('/', express.static(__dirname + '/../angular'));
app.use('/api', require('./controllers'));
app.use('/api', morgan('dev'));

app.listen(port, function () {
    console.log('App listening on port', port);
});
