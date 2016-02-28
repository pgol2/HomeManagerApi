const router = require('express').Router();
const passport = require('passport');
const auth = passport.authenticate('jwt', {session: false});

var routes = function (Expense, User) {

  var expenseController = require('../controllers/expenseController')(Expense);
  var usersController = require('../controllers/usersController')(User);


  router
    .get('/expenses', auth, expenseController.getList)
    .get('/expenses', auth, expenseController.getList)
    .post('/expenses', auth, expenseController.post)
    .get('/expenses/:id', auth, expenseController.getOne)
    .put('/expenses/:id', auth, expenseController.update)
    .delete('/expenses/:id', auth, expenseController.remove)
    .post('/users', usersController.insert)
    .post('/login', usersController.login)

  return router;

};

module.exports = routes;