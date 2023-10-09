const express = require("express");
const {

  getNotificationByUserId,
  getAllnotification,
  getAllnotification,
  getNotificationsWithLikeId,
  getNotificationsWithFriendRequest,
  getNotificationsWithCommentId,

} = require("../controller/notification");


notificationRouter.get("/", getAllnotification);
notificationRouter.get("/:id", getNotificationByUserId);
notificationRouter.get("/withlikeId", getNotificationsWithLikeId);
notificationRouter.get("/withFriendRequest",getNotificationsWithFriendRequest);
notificationRouter.get("/withCommentId", getNotificationsWithCommentId);

module.exports = notificationRouter;
