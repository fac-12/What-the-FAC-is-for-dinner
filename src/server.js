const http = require('http');
const router = require('./router.js');

const server = http.createServer(router);
const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
