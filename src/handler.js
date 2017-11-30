const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const homeHandler = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(500, {'Content-type': 'text/plain'});
      res.end('file not found');
    }
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(file);
  });
};

const staticFileHandler = (req, res, endpoint) => {
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    jpg: 'image/jpeg'
  };

  const extention = endpoint.split('.')[1];

  const filePath = path.join(__dirname, '..', endpoint);

  fs.readFile(filePath, (err, file) => {
    if (err) {
      console.log(err);
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.end('Page not found');
    };
    res.writeHead(200, `Content-type: ${extensionType[extention]}`);
    res.end(file);
  });
};

const getDishesHandler = (req, res) => {
  getDishes((err, resData) => {
    if (err) {
      res.writeHead(500, 'Content-type':'text/plain');
      res.end('Something went wrong on the server');
    }
    else {
      let jsonData = JSON.stringify(resData);
      res.writeHead(200, {'Content-type': 'application/json'});
      res.end(jsonData);
    }
  });
}

const addDishesHandler = (req, res) => {
  let allTheData = '';
  req.on('data', chunk => {
    allTheData += chunk;
  })
  req.on('end', () => {
    allTheData = querystring.parse(allTheData);

    addDishes((err, resData) => {
      if (err) {
        res.writeHead(500, 'Content-type':'text/plain');
        res.end('Something went wrong on the server');
      }
      else {
        res.writeHead(302, {'Location': ''});
        res.end();
      }
    }, allTheData.name, allTheData.gitterhandle, allTheData.dish, allTheData.dietary);
  });
}


module.exports = {homeHandler, staticFileHandler, getDishesHandler, addDishesHandler};
