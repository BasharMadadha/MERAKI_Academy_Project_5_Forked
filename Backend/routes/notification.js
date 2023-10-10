const express = require("express");
const notificationRouter=express.Router()
const {
  getAllnotification,
  getNotificationsWithLikeId,
  getNotificationsWithFriendRequest,
  getNotificationsWithCommentId,

} = require("../controller/notification");


notificationRouter.get("/", getAllnotification);
notificationRouter.get("/withlikeId", getNotificationsWithLikeId);
notificationRouter.get("/withFriendRequest",getNotificationsWithFriendRequest);
notificationRouter.get("/withCommentId", getNotificationsWithCommentId);

module.exports = notificationRouter;
