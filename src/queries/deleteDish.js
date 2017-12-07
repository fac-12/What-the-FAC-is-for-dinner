const databaseConnection = require('../database/db_connections.js');

const deleteDish = (dishName, gitterName, cb) => {
  databaseConnection.query('DELETE FROM dishes WHERE name = $1 AND makerid = (SELECT id FROM users WHERE gitterhandle = $2);', [dishName, gitterName], (err) => {
    if (err) cb(err);
    else cb(null);
  });
};


module.exports = deleteDish;
