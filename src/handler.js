const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const getDishes = require('./queries/getDishes.js');
const addDishes = require('./queries/addDishes');
const bcrypt = require('bcryptjs');
const checkUser = require('./queries/checkUser');
const addUser = require('./queries/addUser');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
require('env2')('config.env');

let SECRET = process.env.SECRET;

const homeHandler = (req, res) => {
  if(req.headers.cookie) {

  }
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(500, { 'Content-type': 'text/plain' });
      res.end('file not found');
    }
    res.writeHead(200, { 'Content-type': 'text/html' });
    res.end(file);
  });
};

const staticFileHandler = (req, res) => {

  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg',
  };

  const extension = req.url.split('.')[1];

  const filePath = path.join(__dirname, '..', req.url);

  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(404, { 'Content-type': 'text/plain' });
      res.end('Page not found');
    }
    res.writeHead(200, `Content-type: ${extensionType[extension]}`);
    res.end(file);
  });
};

const getDishesHandler = (req, res) => {
  getDishes((err, resData) => {
    if (err) {
      res.writeHead(500, { 'Content-type': 'text/plain' });
      res.end('Something went wrong on the server');
    } else {
      const jsonData = JSON.stringify(resData);
      res.writeHead(200, { 'Content-type': 'application/json' });
      res.end(jsonData);
    }
  });
};

const addDishesHandler = (req, res) => {
  if (req.headers.cookie) {
    const cookieStr = cookie.parse(req.headers.cookie).token;
    const payload = jwt.verify(cookieStr, SECRET);
    if (payload.logged_in === true) {
      let tokenGitter = payload.gitterhandle;
      let allTheData = '';
      req.on('data', (chunk) => {
        allTheData += chunk;
      });
      req.on('end', () => {
        allTheData = querystring.parse(allTheData);

        const newObject = {
          name: allTheData.name,
          gitterhandle: allTheData.gitterhandle,
          dish: allTheData.dish,
          dietary: Object.keys(allTheData).slice(3),
        };
        if (newObject.dietary.length === 0) newObject.dietary = ['none of the above'];
        addDishes((err, tokenGitter) => {
          if (err) {
            console.log(err.code, 'THIS IS ERR CODE');
            if (err.code === '23505') {
              res.writeHead(400, { 'Content-type': 'text/plain' });
              res.end('You have already added a dish');
            } else {
              console.log(err);
              res.writeHead(500, { 'Content-type': 'text/plain' });
              res.end('Something went wrong on the server');
            }
          } else {
            res.writeHead(302, { Location: '/' });
            res.end();
          }
        }, newObject.name, newObject.gitterhandle, newObject.dish, newObject.dietary);
      });
    } else {
      res.writeHead(401);
      res.end('You are not logged in, please log in!');
    }
  } else {
    res.writeHead(401);
    res.end('You are not logged in, please log in!');
  }
};


const signUpHandler = (req, res) => {
  let allTheData = '';
  req.on('data', (chunk) => {
    allTheData += chunk;
  });
  req.on('end', () => {
    allTheData = querystring.parse(allTheData);
    checkUser(allTheData.gitterhandle, (err, checkUserRes) => {
      if (err) {
        res.writeHead(500);
        res.end('Internal Server Error');
      } else if (checkUserRes === true) {
        res.writeHead(409);
        res.end('This user is already registered! Please log in :)');
      } else {
        bcrypt.genSalt(10, (saltErr, salt) => {
          if (saltErr) {
            res.writeHead(500);
            res.end('Internal Server Error');
          } else {
            bcrypt.hash(allTheData.password, salt, (hashErr, hashedPw) => {
              if (hashErr) {
                res.writeHead(500);
                res.end('Internal Server Error');
              } else {
                allTheData.password = hashedPw;
                addUser(allTheData, (addUserErr) => {
                  if (addUserErr) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                  } else {
                    const token = jwt.sign({ username: allTheData.gitterhandle, logged_in: true }, SECRET);
                    res.writeHead(302, { Location: '/', 'Set-Cookie': `token=${token}; HttpOnly; Max-Age=9000` });
                    res.end();
                  }
                });
              }
            });
          }
        });
      }
    });
  });
};

const logInHandler = (request, response) => {


};






module.exports = {
  homeHandler,
  staticFileHandler,
  getDishesHandler,
  addDishesHandler,
  logInHandler,
  signUpHandler,
};
