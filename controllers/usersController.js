const _ = require('lodash');
const bcrypt = require('bcrypt');


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
      //@TODO move it to user model
      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.json('ok');
      } else {
        res.json('not ok');
      }
    });
  };

  return {
    insert,
    login
  };
};


module.exports = usersController;
