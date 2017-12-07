const databaseConnection = require('../database/db_connections.js');

const addDishes = (cb, dishName, dietaryArray, tokenGitter) => {
  databaseConnection.query(`INSERT INTO dishes (name, makerID) VALUES ($1, (SELECT id FROM users WHERE gitterhandle = $2));`,[dishName, tokenGitter], (err, res) => {
    if (err) {
      cb(err);
    } else {
      dietaryArray.forEach((value, index, array) => {
        databaseConnection.query(`INSERT INTO connections (dish_id, dietary_id)
              VALUES ((SELECT id FROM dishes WHERE name = $1 AND makerID = (SELECT id FROM users WHERE gitterhandle = $3)), (SELECT id FROM dietary WHERE name = $2))`,[dishName, value, tokenGitter], (dietaryErr, dietaryRes) => {
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
