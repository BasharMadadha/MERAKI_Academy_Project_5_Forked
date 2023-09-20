const { Pool } = require("pg");


const connectionString = process.env.CONNECTION_STRING;
const pool = new Pool({
 
  connectionString,
});
pool.connect((err,pool)=>{
  if (err){
    console.error("pool error: ",err.message)
    return
  }
  console.error("pool connected on: ",pool.user)
})

module.exports = pool;

