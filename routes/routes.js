var router = require('express').Router();


var routes = function (Expense, User) {

  var expenseController = require('../controllers/expenseController')(Expense);
  var usersController = require('../controllers/usersController')(User);


  router.route('/expenses').get(expenseController.getList);
  router.route('/expenses').post(expenseController.post);
  router.route('/expenses/:id').get(expenseController.getOne);
  router.route('/expenses/:id').put(expenseController.update);
  router.route('/expenses/:id').delete(expenseController.remove);
  router.route('/users').post(usersController.insert);
  router.route('/login').post(usersController.login);

  return router;

};

module.exports = routes;