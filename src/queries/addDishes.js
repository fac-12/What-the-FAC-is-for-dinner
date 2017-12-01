const databaseConnection = require('../database/db_connections.js');

const addDishes = (cb, userName, userHandle, dishName, dietaryArray) => {
  databaseConnection.query(`INSERT INTO users (name, gitterhandle) VALUES ($1, $2);`,[userName, userHandle], (err, res) => {
    if (err) {
      cb(err);
    } else {
      databaseConnection.query(`INSERT INTO dishes (name, makerID) VALUES ($1, (SELECT id FROM users WHERE gitterhandle = $2));`,[dishName, userHandle], (err, res) => {
        if (err) {
          cb(err);
        } else {
          dietaryArray.forEach((value, index, array) => {
            console.log(value);
            databaseConnection.query(`INSERT INTO connections (dish_id, dietary_id)
              VALUES ((SELECT id FROM dishes WHERE name = $1), (SELECT id FROM dietary WHERE name = $2))`,[dishName, value], (dietaryErr, dietaryRes) => {
                if (dietaryErr) {
                  cb(dietaryErr);
                } else if (index === array.length - 1) {
                  cb(null, dietaryRes);
                }
              });
          });
        }
      });
    }
  });
};


module.exports = addDishes;
