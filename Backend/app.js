
const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");

app.use(express.json());

const postsRouter = require("./routes/posts");

app.use("/posts", postsRouter);
const PORT = process.env.PORT || 5000;

const userRouter = require("./routes/User");

app.use("/",userRouter)

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT,()=>{
    console.log(`server is running on post=${PORT}`);
})

