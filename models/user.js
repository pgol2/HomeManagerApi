var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var User = new Schema({
    email: String,
    password: String
});


User.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync((8)), null);
};

User.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', User);
