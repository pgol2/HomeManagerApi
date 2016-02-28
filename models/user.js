const mongoose = require('mongoose');
require('mongoose').Promise = Promise;

const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;


var User = new Schema({
  email: String,
  password: String,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: {
    type: Number
  }
});

User.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) next(err);
      user.password = hash;
      next();
    });
  });
});


User.methods.checkPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password, function (err, isMatch) {
      if (err) reject(err);
      resolve(isMatch);
    })
  });
};

module.exports = mongoose.model('User', User);
