const express = require("express");
const {
    getNotificationByUserId,
    getAllnotification
} = require("../controller/notification");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const notificationRouter = express.Router();

notificationRouter.get("/", getAllnotification);
notificationRouter.get("/:id", getNotificationByUserId);



module.exports = notificationRouter;
