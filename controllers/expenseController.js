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

        expense.save();
        res.status(201);
        res.send(expense);
    };


    return {
        get: get,
        post: post
    };
};

module.exports = expenseController;