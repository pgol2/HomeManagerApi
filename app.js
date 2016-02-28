var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const config = require('./config');

const db = require('./config/db').init();
require('./config/passport').init();

const Expense = require('./models/expense');
const User = require('./models/user');



var app = express();
var port = config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var router = require('./routes/routes')(Expense, User);


console.log(__dirname + '/docs');
app.use('/docs', express.static(__dirname + '/docs'));
app.use('/api', router);




app.listen(config.port, () => console.log('Running on port ' + config.port));


module.exports = app;
