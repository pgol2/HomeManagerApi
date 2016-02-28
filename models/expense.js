const mongoose = require('../lib/mongoose');
const Schema = mongoose.Schema;


const Expense = new Schema({
    title: {
      type:  String,
      required: '{PATH} is required!'
    },
    category: String,
    creator: String,
    created: { type: Date, default: Date.now },
    value: Number
});


module.exports = mongoose.model('Expense', Expense);
