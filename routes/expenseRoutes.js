var router = require('express').Router();


var routes = function (Expense) {

  var expenseController = require('../controllers/expenseController')(Expense);


  router.route('/expenses').get(expenseController.getList);
  router.route('/expenses').post(expenseController.post);
  router.route('/expenses/:id').get(expenseController.getOne);
  router.route('/expenses/:id').put(expenseController.update);
  router.route('/expenses/:id').delete(expenseController.remove);

  return router;

};

module.exports = routes;