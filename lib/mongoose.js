var mongoose = require('mongoose');
require('mongoose').Promise = Promise;

//create mongoose instance with predefined promise library
module.exports = mongoose;