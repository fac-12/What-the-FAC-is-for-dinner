const test = require('tape');
const shot = require('shot');
const router = require('../router.js');
const getDishes = require('../queries/getDishes.js');
const runDbBuild = require('../database/db_build.js');
const addDishes = require('../queries/addDishes.js');
const addUser = require('../queries/addUser.js');
const getUsers = require('./getUsers.js');
const checkUser = require('../queries/checkUser.js');
const bcryptjs = require('bcryptjs');


test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
});

test('home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with a statuscode of 200');
    t.equal(res.payload.startsWith('<!DOCTYPE html>'), true, 'should return index page');
    t.end();
  });
});

test('unknow route', (t) => {
  shot.inject(router, { method: 'get', url: '/gqtrbergaeh' }, (res) => {
    t.equal(res.statusCode, 404, 'should respond with a statuscode of 404');
    t.end();
  });
});

test('getDishes', (t) => {
  runDbBuild((err, res) => {
    getDishes((error, responseRows) => {
      if (error) {
        console.log(err);
      } else {
        console.log(responseRows);
        t.equals(typeof responseRows, 'object', 'response should be an object');
        t.end();
      }
    });
  });
});


test('addDishes', (t) => {
  runDbBuild((err, res) => {
    addDishes((err, responseRows) => {
      if (err) {
        t.equals(typeof err, 'Object', 'Any error should be an object');
      } else {
        t.equals(err, null, 'If adding a dish is successful, the error is null');
        getDishes((err, dishArray) => {
          const testDish = dishArray[dishArray.length - 1];
          t.equals(testDish.users, 'Natalie', 'Name should be Natalie');
          t.equals(testDish.gitter, '@njseeto', 'gitter should be @njseeto');
          t.equals(testDish.dishes, 'pancakes', 'dish should be pancakes');
          t.deepEquals(testDish.diet, 'vegan, vegetarian', 'diet should be vegan and vegatarian');
          t.end();
        });
      }
    }, 'pancakes', ['vegan', 'vegetarian'], '@njseeto');
  })
})


test('addUser', (t) => {
  runDbBuild((err, res) => {
    const beckyObj = { name: 'Becky', gitterhandle: 'rb50', password: '$2a$10$f9bHlm5g5AEg6cg/gcTMm.HTVYd9m2Kg2yPLpR9.JvWi8RFTOJm.i' };
    addUser(beckyObj, (userErr, response) => {
      if (userErr) {
        t.equals(typeof userErr, 'Object', 'Any error should be an object');
      } else {
        t.equals(response, 'signed-up', 'Response should be the message of signed-up');
        checkUser('rb50', (checkUserErr, checkUserRes) => {
          t.equals(checkUserRes[0].case, true, 'New user has been added to the database');
          bcryptjs.compare('pa$$w0rd', beckyObj.password, (compareErr, correct) => {
            t.equals(correct, true, 'password should match hashed password');
            t.end();
          });
        });
      }
    });
  });
});
