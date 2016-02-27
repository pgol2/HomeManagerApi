var mongoose = require('../lib/mongoose');

var Schema = mongoose.Schema;


var Expense = new Schema({
    title: String,
    category: String,
    creator: String,
    created: { type: Date, default: Date.now },
    value: Number
});


module.exports = mongoose.model('Expense', Expense);
