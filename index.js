var express = require('express');
var compress = require('compression');
var directory = require('serve-index');
var morgan = require('morgan'); //logging for express

var app = express();

var oneDay = 86400000;

app.use(compress());
app.use(morgan());
app.use(express.static('.', { maxAge: oneDay }));
app.use(directory('.', {'icons': true}))

app.listen(process.env.PORT || 8000);

console.log("Ready To serve files !")