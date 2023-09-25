const express = require("express");
const friendRoutes = express.Router();
const {
  sendFreindReq,
  getUserFriends,
  updateFriendRequest,
  removeFriend,
  showFriendRequest,
} = require("../controller/friends");

friendRoutes.post("/addFriends", sendFreindReq);
friendRoutes.get("/userFriends/:userId", getUserFriends);
friendRoutes.put("/updateFriendRequest", updateFriendRequest);
friendRoutes.delete("/deleteFriends", removeFriend);
friendRoutes.get("/userRequest/:userId", showFriendRequest)
module.exports = friendRoutes;
