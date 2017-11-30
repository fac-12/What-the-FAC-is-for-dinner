const {
  homeHandler, staticFileHandler, getDishesHandler, addDishesHandler
} = require('./handler.js');

const router = (request, response) => {
  const endpoint = request.url.split('/')[1];

  if (endpoint === '') {
    homeHandler(request, response);
  } else if (endpoint.includes('public')) {
    staticFileHandler(request, response);
  } else if (endpoint === 'getDishes') {
    getDishesHandler(request, response);
  } else if (endpoint === 'addDishes') {
    addDishesHandler(request, response);
  } else {
    response.writeHead(404, { 'Content-type': 'text/plain' });
    response.end('Page not found');
  }
};

module.exports = router;
