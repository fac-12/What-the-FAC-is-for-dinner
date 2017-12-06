const databaseConnection = require('../database/db_connections.js');

const addUser = (cb, userObj) => {
  databaseConnection.query(`
    INSERT INTO users(name, gitterhandle, password) VALUES ($1, $2, $3)`, [userObj.name, userObj.gitterhandle, userObj.password], (err) => {
      if (err) {
        cb(err);
      } else {
        cb(null, 'signed-up');
      }
    });
};

module.exports = addUser;
