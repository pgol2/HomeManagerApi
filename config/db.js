const mongoose = require('../lib/mongoose');
const config = require('./index');




module.exports = {
  init: function () {
    const connection = mongoose.connect(config.db.url, (error) => {
      if (error) {
        console.error('mongo Error');
        console.error(error);
        return error;
      }
    });

    mongoose.connection.on('error', (err) => console.error(`database error ${err}`));
    mongoose.connection.once('open', () => console.log('connection to mongo open'));

    return connection;
  }
};