var express = require('express');
var mongoose = require('mongoose');


var db = mongoose.connect('mongodb://localhost/expenses');
var app = express();
var port = process.env.PORT || 3000;

var router = express.Router();


var Expense = require('../models/expenseModel');

router.route('/expenses')
    .get(function (req, res) {
        var query = {};

        if(req.query.category) {
            query.category = req.query.category;
        }

        Expense.find(query, function (err, books) {

            if (err) {
                console.log(err);
            } else {
                res.json(books);
            }
        });
    });

app.use('/api', router);


app.listen(port, function () {
    console.log('Running on port ' + port);
});
