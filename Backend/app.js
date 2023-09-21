const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
app.use(express.json());
const postsRouter = require("./routes/posts");  
const roleRouter = require("./routes/role");
const userRouter = require("./routes/User");
app.use("/posts", postsRouter);
app.use("/",userRouter)  
app.use("/role", roleRouter);
const PORT = process.env.PORT || 5000; 


app.use("*", (req, res) => res.status(404).json("NO content at this path")); 
app.listen(PORT,()=>{console.log(`server is running on post=${PORT}`); })

