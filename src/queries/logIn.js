const databaseConnection = require('../database/db_connections.js');

const logIn = (gitterhandle, cb) => {
  databaseConnection.query('SELECT password FROM users WHERE gitterhandle = $1', [gitterhandle], (err, res) => {
    if (err) cb(err, null);
    else cb(null, res);
  });
};

module.exports = logIn;
