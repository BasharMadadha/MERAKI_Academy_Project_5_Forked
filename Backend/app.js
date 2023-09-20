const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
app.use(express.json());

const postsRouter = require("./routes/posts");

app.use("/posts", postsRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on post=${PORT}`);
});
