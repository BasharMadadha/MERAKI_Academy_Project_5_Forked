const express =require('express')
const app =express()
require('dotenv').config(); 
const PORT =process.env.PORT || 5000

const pool = require('./db');

app.use(express.json());







app.listen(PORT,()=>{
    console.log(`server is running on post=${PORT}`);
})