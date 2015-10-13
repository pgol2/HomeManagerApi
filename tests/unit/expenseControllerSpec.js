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


            var expenseController = require('../../controllers/expenseController')(Expense);

            expenseController.post(req, res);

            res.status.calledWith(400).should.equal(true);


        })
    });
});