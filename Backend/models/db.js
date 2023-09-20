const { Pool } = require("pg");

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
  connectionString,
});
pool.connect((err,pool)=>{
  if(err){
    console.error("Pool Error is : ",err.message)
    return
  }
  console.error("Pool connected on: ", pool.user)
})


module.exports = pool;