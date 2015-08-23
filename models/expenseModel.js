var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var expenseModel = new Schema({
    title: String,
    category: String,
    creator: String,
    created: { type: Date, default: Date.now },
    value: Number
});


module.exports = mongoose.model('Expense', expenseModel);
