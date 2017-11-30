const databaseConnection = require('../database/db_connections.js');

const addDishes = (cb, userName, userHandle, dishName, dietaryArray) => {
  databaseConnection.query(`INSERT INTO users (name, gitterhandle) VALUES ('${userName}', '${userHandle}');
   INSERT INTO dishes (name, makerID) VALUES ('${dishName}', (SELECT id FROM users WHERE gitterhandle = '${userHandle}'));`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      dietaryArray.forEach((value, index, array) => {
        console.log(value);
        databaseConnection.query(`INSERT INTO connections (dish_id, dietary_id)
        VALUES ((SELECT id FROM dishes WHERE name = '${dishName}'), (SELECT id FROM dietary WHERE name = '${value}'))`, (dietaryErr, dietaryRes) => {
          if (dietaryErr) {
            cb(dietaryErr);
          } else if (index === array.length - 1) {
            cb(null, dietaryRes);
          }
        });
      });
    }
  });
};

module.exports = addDishes;
