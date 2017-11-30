const { Pool } = require('pg');

const url = require('url');
require('env2')('./config.env');

// Using test db for now! not sure how NODE_ENV works yet so change later!
let DB_URL = process.env.TEST_DATABASE_URL;

if (!DB_URL) throw new Error('Environment variable DB_URL must be set');

const params = url.parse(DB_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password: password
};

options.ssl = options.host !== 'localhost';

module.exports = new Pool(options);
