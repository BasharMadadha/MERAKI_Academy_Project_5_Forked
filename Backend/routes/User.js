const express = require("express");
const userRouter = express.Router();
const { register, login, getAllUsers ,userById} = require("../controller/Users");

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/getAllUser", getAllUsers);
userRouter.get("/user/:username", userById);


module.exports = userRouter;
