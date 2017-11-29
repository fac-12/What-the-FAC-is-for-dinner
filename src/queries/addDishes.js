const databaseConnection = require('../database/db_connection.js');

const addDishes = cb => {
  databaseConnection.query(
 `INSERT INTO users (name, gitterhandle) VALUES (${userName}, ${userHandle});
  INSERT INTO dishes (name, makerID) VALUES (${dishName}, (SELECT id FROM users WHERE gitterhandle = ${userHandle}));
  INSERT INTO connections (dish_id, dietary_id)
  VALUES ((SELECT id FROM dishes WHERE name = ${dishName}),(SELECT id FROM dietary WHERE name = ${dietaryName})),
   ((SELECT id FROM dishes WHERE name = ${dishName}),(SELECT id FROM dietary WHERE name = ${dietaryName}))`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res.rows);
    }
  });
};

module.exports = addDishes;
