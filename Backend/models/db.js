const { Pool } = require("pg");


const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
 
  connectionString,
});
pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
  });
  
  pool.on('error', (err) => {
    console.error('PostgreSQL error:', err);
  });


module.exports = pool;