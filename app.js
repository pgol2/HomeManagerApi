var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Expense = require('./models/expense');
const config = require('./config');
const db = require('./config/db');


var app = express();
var port = config.port;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var expenseRouter = require('./routes/expenseRoutes')(Expense);


console.log(__dirname + '/docs');
app.use('/docs', express.static(__dirname + '/docs'));
app.use('/api', expenseRouter);




app.listen(config.port, () => console.log('Running on port ' + config.port));


module.exports = app;
