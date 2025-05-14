const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { // Required for Render and Neon
    rejectUnauthorized: false,
  },
});

module.exports = pool;