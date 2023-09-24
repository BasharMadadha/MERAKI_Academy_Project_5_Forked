const express = require("express");
const userRouter = express.Router();
const { register, login, getAllUsers } = require("../controller/Users");

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/getAllUser", getAllUsers);

module.exports = userRouter;
