var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Expense = require('../models/expenseModel');


var db;
if(process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/expenses_test');
} else {
    db = mongoose.connect('mongodb://localhost/expenses');
}

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var expenseRouter = require('../routes/expenseRoutes')(Expense);
app.use('/api/expenses', expenseRouter);



app.listen(port, function () {
    console.log('Running on port ' + port);
});


module.exports = app;