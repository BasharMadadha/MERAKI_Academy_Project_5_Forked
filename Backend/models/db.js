
const { Pool } =require('pg')
const bcrypt= require('bcrypt')
const connectionString = process.env.CONNECTION_STRING
 
const pool = new Pool({
 
    connectionString,
  });
  
  
  
  
  
  module.exports = {pool,bcrypt};