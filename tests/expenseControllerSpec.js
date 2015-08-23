var should = require('should');
var sinon = require('sinon');

describe('Expense Controller Tests:', function () {

    describe('Post', function () {
        it('should not allow empty title on post', function () {
            var Expense = function (expense) {
                this.save = function () {
                };
            };

            var req = {
                body: {
                    creator: 'John'
                }
            };


            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            };


            var bookController = require('../controllers/expenseController')(Expense);

            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);


        })
    });
});