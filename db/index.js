const config = require(`${__base}config`);
const { Pool } = require('pg');

const connectionString = config.get('dbUrl');

const pool = new Pool({
  connectionString,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
