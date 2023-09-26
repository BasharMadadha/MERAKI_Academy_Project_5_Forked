const express = require("express");
const userRouter = express.Router();
const { register, login, getAllUsers ,userByUserName,getUserById} = require("../controller/Users");

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.get("/users/getAllUser", getAllUsers);
userRouter.get("/user/:username", userByUserName);
userRouter.get("/users/:id", getUserById);


module.exports = userRouter;
