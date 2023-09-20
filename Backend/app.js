const express =require('express')
const app =express()
require('dotenv').config(); 
const PORT =process.env.PORT || 5000

const pool = require('./models/db');

app.use(express.json());


const userRouter = require("./routes/User");

app.use("/",userRouter)

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT,()=>{
    console.log(`server is running on post=${PORT}`);
})