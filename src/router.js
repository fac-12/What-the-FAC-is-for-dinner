const {
  homeHandler,
  staticFileHandler,
  getDishesHandler,
  addDishesHandler,
  logInHandler,
  signUpHandler,
} = require('./handler.js');

const router = (request, response) => {
  const homeUrl = request.url;
  const url = request.url.split('/')[1];

  if (homeUrl === '/') {
    homeHandler(request, response);
  } else if (url.includes('public')) {
    staticFileHandler(request, response, homeUrl);
  } else if (url === 'getDishes') {
    getDishesHandler(request, response);
  } else if (url === 'addDishes') {
    addDishesHandler(request, response);
  } else if (url === 'signUp') {
    signUpHandler(request, response);
  } else if (url === 'logIn') {
    logInHandler(request, response);
  } else {
    response.writeHead(404, { 'Content-type': 'text/plain' });
    response.end('Page not found');
  }
};

module.exports = router;
