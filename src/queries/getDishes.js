const databaseConnection = require('../database/db_connections.js');

const getDishes = (cb) => {
  databaseConnection.query('SELECT users.name, dishes.name, dietary.name'+
                           'FROM users, dishes, dietary, connections'+
                           'WHERE users.id = dishes.makerid AND dishes.id = connections.dish_id' +'AND connections.dietary_id = dietary.id', (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getDishes;
