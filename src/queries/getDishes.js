const databaseConnection = require('../database/db_connections.js');

const getDishes = (cb) => {
  databaseConnection.query('SELECT users.name AS users, dishes.name AS dishes, dietary.name AS diet FROM users, dishes, dietary, connections WHERE users.id = dishes.makerid AND dishes.id = connections.dish_id AND connections.dietary_id = dietary.id', (err, res) => {
    if (err) {
      console.log('there is error');
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getDishes;
