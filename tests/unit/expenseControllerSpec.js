var sinon = require('sinon');
var expect = require('chai').expect;

describe('Expense Controller Tests:', function () {

    describe('Post', function () {
        it('should not allow empty title on post', function () {
            var Expense = function () {
                this.save = function () {
                    return Promise.resolve({});
                }
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

            expect(res.status.calledWith(400)).to.equal(true);

        })
    });
});
