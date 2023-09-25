const { pool } = require("../models/db");

const sendFreindReq = async (req, res) => {
  try {
    const { reqsFrom, reqsTo  } = req.body;

    const existingFriendship = await pool.query(
      "SELECT * FROM friend_list WHERE (user_id = $1 AND friend_user_id = $2) OR (user_id = $2 AND friend_user_id = $1)",
      [reqsFrom, reqsTo]
    );

    if (existingFriendship.rows.length > 0) {
      throw new Error("Friend relationship already exists");
    }
    if (reqsFrom === reqsTo) {
      throw new Error("Cannot add yourself as a friend");
    }

    const result = await pool.query(
      `INSERT INTO friend_list (user_id, friend_user_id, status, created_at) 
        VALUES ($1, $2, $3, NOW())`,
      [reqsFrom, reqsTo, "pending"]
    );

    console.log(result.rows);
    if (result.rows) {
     

      res.status(201).json({
        success: true,
        message: "Friend request sent successfully",
        result: result.rows[0], 
      });
    }
  } catch (error) {
    console.error("Error sending friend request:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to send friend request",
      error: error.message,
    });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT u.username AS friend_username, u.image AS friend_image, f.status
       FROM friend_list AS f
       JOIN users AS u ON f.friend_user_id = u.id
       WHERE (f.user_id = $1 OR f.friend_user_id = $1) AND f.status = 'friend'`,
      [userId]
    );

    const userFriends = result.rows;

    res.status(200).json({
      success: true,
      userFriends,
    });
  } catch (error) {
    console.error("Error getting user's friends:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get user's friends",
    });
  }
};

const updateFriendRequest = async (req, res) => {
  try {
    const { reqsFrom, reqsTo, status } = req.body;

    const result = await pool.query(
      "UPDATE friend_list SET status = $1 WHERE user_id = $2 AND friend_user_id = $3",
      [status, reqsFrom, reqsTo]
    );

    if (result.rowCount === 1) {
      res.status(200).json({
        success: true,
        message: `Friend request ${status}ed successfully`,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }
  } catch (error) {
    console.error("Error updating friend request:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to update friend request",
    });
  }
};
const removeFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const existingFriendship = await pool.query(
      "SELECT * FROM friend_list WHERE user_id = $1 AND friend_user_id = $2",
      [userId, friendId]
    );

    if (existingFriendship.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Friendship not found",
      });
    }

    await pool.query(
      "DELETE FROM friend_list WHERE user_id = $1 AND friend_user_id = $2",
      [userId, friendId]
    );

    res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    console.error("Error removing friend:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to remove friend",
    });
  }
};
const showFriendRequest = async (req, res) => {
  try{
    const { userId } = req.params;
    const loggedInUser = userId;
    console.log(loggedInUser);
    console.log(userId);
        const result = await pool.query(
      "SELECT * FROM friend_list WHERE friend_user_id = $1 AND status = 'pending' AND user_id != $2",
    [userId,loggedInUser])
    res.status(200).json({
      success: true,
      requests: result.rows,
    });
  } catch (error) {
    console.error("Error getting pending friend requests:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get pending friend requests",
      error: error.message,
    });
  }
}

module.exports = {
  sendFreindReq,
  getUserFriends,
  updateFriendRequest,
  removeFriend,
  showFriendRequest
};
