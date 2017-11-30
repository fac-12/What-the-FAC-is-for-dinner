const test = require('tape');
const shot = require('shot');
const router = require('../../src/router.js');

test('tape is working', (t) => {
  const num = 2;
  t.equal(num, 2, 'should return 2');
  t.end();
});

test('home route', (t) => {
  shot.inject(router, { method: 'get', url: '/' }, (res) => {
    t.equal(res.statusCode, 200, 'should respond with a statuscode of 200');
    t.end();
  });
});
