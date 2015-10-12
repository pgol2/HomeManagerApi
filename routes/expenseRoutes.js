var router = require('express').Router();



var routes = function (Expense) {

    var expenseController = require('../controllers/expenseController')(Expense);


    router.route('/')
        .get(expenseController.get)
    /**
     * @api {post} /expense add new expense
     * @apiName PostExpense
     * @apiGroup Expense
     *
     *
     * @apiSuccess {String} title name of expense
     * @apiSuccess {String} category expense category
     * @apiSuccess {String} creator name of person
     * @apiSuccess {Number} value
     */
        .post(expenseController.post);

    //TODO think about better way for handling these callbacks (maybe some middleweare?)
    router.route('/:id')
    /**
     * @api {get} /expense/:id Requests expense information
     * @apiName GetExpense
     * @apiGroup Expense
     *
     * @apiParam {Number} id Users unique ID.
     *
     * @apiSuccess {String} title name of expense
     * @apiSuccess {String} category expense category
     * @apiSuccess {String} creator name of person
     * @apiSuccess {Date} created when it was created
     * @apiSuccess {Number} value
     */
        .get(function (req, res) {
            Expense.findById(req.params.id, function (err, expense) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(expense);
                }
            });
        })
        .put(function (req, res) {
            Expense.findByIdAndUpdate(req.params.id, req.body, function (err, expense) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(expense);
                }
            })
        })
        .delete(function (req, res) {
            Expense.findByIdAndRemove(req.params.id, req.body, function (err, expense) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).json(expense);
                }
            })
        });


    return router;

};

module.exports = routes;