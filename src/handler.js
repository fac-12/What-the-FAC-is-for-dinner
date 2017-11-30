const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const getDishes = require('./queries/getDishes.js');
const addDishes = require('./queries/addDishes');

const homeHandler = (req, res) => {
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
  let allTheData = '';
  req.on('data', (chunk) => {
    allTheData += chunk;
  });
  req.on('end', () => {
    allTheData = querystring.parse(allTheData);

    Object.keys(allTheData).forEach((key) => {
      allTheData[key] = allTheData[key].replace(/[/[<|>|*|%|!|@|=]/g, '');
    });

    console.log(allTheData);

    const newObject = {
      name: allTheData.name,
      gitterhandle: allTheData.gitterhandle,
      dish: allTheData.dish,
      dietary: Object.keys(allTheData).slice(3),
    };
    console.log('before if: ', newObject);
    if (newObject.dietary.length === 0) newObject.dietary = ['no dietary reqirement satisfied'];

    console.log('after if: ', newObject);
    addDishes((err, resData) => {
      if (err) {
        console.log(err.code, "THIS IS ERR CODE");
        if (err.code === '23505') {
          res.writeHead(400, { 'Content-type': 'text/plain' });
          res.end('You have already added a dish');
        } else {
        console.log(err);
        res.writeHead(500, { 'Content-type': 'text/plain' });
        res.end('Something went wrong on the server');
      }
    } else {
        res.writeHead(302, { 'Location' : '/' });
        res.end();
      }
    }, newObject.name, newObject.gitterhandle, newObject.dish, newObject.dietary);
  });
};


module.exports = {
  homeHandler,
  staticFileHandler,
  getDishesHandler,
  addDishesHandler,
};
