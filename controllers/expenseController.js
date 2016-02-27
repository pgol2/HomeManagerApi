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

    if(!req.body.title) {
      res.status(400);
      //TODO add some middleweare for universal error formatting
      res.send({title: 'title is required'});
    }

    expense.save().then(() => {
      res.status(201);
      res.send(expense);
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