const databaseConnection = require('../database/db_connections.js');

const checkUser = (gitterhandle, cb) => {
  databaseConnection.query(`
    SELECT CASE WHEN EXISTS(SELECT gitterhandle FROM users WHERE gitterhandle = $1) THEN CAST (true AS BOOLEAN) ELSE CAST (false AS BOOLEAN) END`, [gitterhandle], (err, res) => {
      console.log('Response from checkUser query:', res);
      if (err) cb(err);
      else cb(null, res.rows);
    });
};

module.exports = checkUser;
