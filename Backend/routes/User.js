const express = require("express");
const userRouter = express.Router();
const { register, login, getAllUsers ,userByUserName,getUserById,updateUserById,updateUserImage} = require("../controller/Users");
const authentication = require("../middleware/authentication");

userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.get("/users/getAllUser", getAllUsers);
userRouter.get("/user/:username", userByUserName);
userRouter.get("/users/:id", getUserById);
userRouter.put("/users",authentication, updateUserById);
userRouter.put("/users/image",authentication, updateUserImage);

module.exports = userRouter;
