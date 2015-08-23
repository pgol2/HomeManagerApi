var bookController = function (Expense) {

    var get = function (req, res) {
        var query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        Expense.find(query, function (err, books) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(books);
            }
        });
    };

    var post = function (req, res) {
        var expense = new Expense(req.body);

        expense.save();
        res.status(201).send(expense);
    };


    return {
        get: get,
        post: post
    };
};

module.exports = bookController;