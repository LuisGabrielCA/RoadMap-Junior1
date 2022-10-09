const dotenv = require('dotenv');

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME
} = process.env;

module.exports = Object.freeze({
  PORT: process.env.PORT || 3000,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_URI: `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/example?authSource=admin`
});
