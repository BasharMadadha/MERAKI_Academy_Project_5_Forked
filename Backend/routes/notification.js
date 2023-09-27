const express = require("express");
const {
    notification
} = require("../controller/notification");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const notificationRouter = express.Router();

notificationRouter.post("/add", authentication, notification);



module.exports = notificationRouter;
