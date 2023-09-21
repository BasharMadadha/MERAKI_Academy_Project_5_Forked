const express = require("express");
const friendRoutes = express.Router();
const {
  addFriend,
  getUserFriends,
  updateFriendRequest,
  removeFriend
} = require("../controller/friends");

friendRoutes.post("/addFriends", addFriend);
friendRoutes.get("/userFriends/:userId", getUserFriends);
friendRoutes.put("/updateFriendRequest", updateFriendRequest);
friendRoutes.delete("/deleteFriends", removeFriend);
module.exports = friendRoutes;
