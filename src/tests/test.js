const test = require('tape');
const shot = require('shot');
const router = require('../router.js');
const getDishes = require('../queries/getDishes.js');
const runDbBuild = require('../database/db_build.js');

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
    console.log('db built');
    getDishes((error, responseRows) => {
      if (error) {
        console.log(err);
      } else {
        console.log(responseRows);
        t.deepEqual(typeof responseRows, 'object', 'response should be an object');
        t.end();
      }
    });
  });
});
