const _ = require('lodash');

var expenseController = function (Expense) {

  var get = function (req, res) {
    var query = {};

    if (req.query.category) {
      query.category = req.query.category;
    }

    Expense.find(query).then(function (items) {
      res.json(items);
    });
  };

  var post = function (req, res) {

    var expense = new Expense(req.body);

    expense.save().then(() => {
      res.status(201);
      res.send(expense);
    }).catch(err => {
      res.status(400).json(_.get(err, 'errors.title.message', 'error'));
    });
  };


  var getOne = function (req, res) {
    Expense.findById(req.params.id)
      .then(expense => {
        if (expense) {
          res.json(expense);
        } else {
          res.send(404);
        }
      }).catch(err => next(error));
  };

  var update = function (req, res) {
    Expense.findByIdAndUpdate(req.params.id, req.body)
      .then(expense => res.send(expense))
      .catch(err => next(error));
  };

  var remove = function (req, res) {
    Expense.findByIdAndRemove(req.params.id, req.body)
      .then(expense => res.send(204));
  };

  return {
    post,
    getOne,
    update,
    remove,
    getList: get
  };
};

module.exports = expenseController;