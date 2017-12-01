const databaseConnection = require('../database/db_connections.js');

const getDishes = (cb) => {
  databaseConnection.query(`
    SELECT users.name AS users, users.gitterhandle AS gitter,
    dishes.name AS dishes, string_agg(dietary.name, ', ') AS diet
    FROM users, dishes, dietary, connections WHERE users.id = dishes.makerid
    AND dishes.id = connections.dish_id AND connections.dietary_id = dietary.id
    GROUP BY users.name, users.gitterhandle, dishes.name`, (err, res) => {
    if (err) {
      console.log('there is error');
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = getDishes;
