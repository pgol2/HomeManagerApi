const _ = require('lodash');
const bcrypt = require('bcrypt');
const config = require('../config');
const jwt = require('jsonwebtoken');


var getPayload = function (user) {
  return {
    email: user.email,
    aud: config.jwt.audience,
    iss: config.jwt.issuer
  }
};

var usersController = function (User) {

  var insert = function (req, res) {
    User.findOne({email: req.body.email}).then(user => {
      if (user) {
        res.status(422).json({message: 'User already exists'});
      } else {
        var newUser = new User({
          email: req.body.email,
          password: req.body.password
        });

        newUser.save().then(savedUser => {
          res.json({message: 'User has been added'});
        });
      }
    });
  };

  var login = function (req, res, next) {
    User.findOne({
      email: req.body.email
    }).then(user => {
      user.checkPassword(req.body.password).then(isMatch => {

        var token = jwt.sign(getPayload(user), config.secrets.jwt, {
          expiresIn: 60 * 60 * 5
        });

        if (user && isMatch) {
          res.json({
            token: token
          });
        } else {
          res.send(401);
        }
      }).catch(err => next(err));
    });
  };

  return {
    insert,
    login
  };
};


module.exports = usersController;
