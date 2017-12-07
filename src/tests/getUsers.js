const databaseConnection = require('../database/db_connections.js');

const getUsers = (gitterhandle, cb) => {
  databaseConnection.query('SELECT * FROM USERS WHERE gitterhandle = $1', [gitterhandle], (err, res) => {
    if (err) {
      console.log('there is error');
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getUsers;
