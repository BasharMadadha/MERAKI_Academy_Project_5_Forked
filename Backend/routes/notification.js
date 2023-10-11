const express = require("express");
const {
  getAllnotification,
  getNotificationsWithLikeId,
  getNotificationsWithFriendRequest,
  getNotificationsWithCommentId,
} = require("../controller/notification");
const notificationRouter = express.Router();

notificationRouter.get("/", getAllnotification);
notificationRouter.get("/withlikeId", getNotificationsWithLikeId);
notificationRouter.get("/withFriendRequest", getNotificationsWithFriendRequest);
notificationRouter.get("/withCommentId", getNotificationsWithCommentId);

module.exports = notificationRouter;
