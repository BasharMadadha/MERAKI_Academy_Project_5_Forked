const express = require("express");
const userRouter = express.Router();
const { register, login, userById } = require("../controller/Users");


userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.get("/user/:username", userById);

module.exports = userRouter;
