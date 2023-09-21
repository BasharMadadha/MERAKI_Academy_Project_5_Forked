const { pool } = require("../models/db");

const addFriend = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    const existingFriendship = await pool.query(
      "SELECT * FROM friend_list WHERE user_id = $1 AND friend_user_id = $2",
      [userId, friendId]
    );
    if (existingFriendship.rows.length > 0) {
      throw new Error("Friend relationship already exists");
    }
    if (userId === friendId) {
        throw new Error("Cannot add friend")
    }
    const result = await pool.query(
      `INSERT INTO friend_list  (user_id, friend_user_id, status, created_at) 
        VALUES ($1, $2, $3, NOW())`,
      [userId, friendId, "pending"]
    );
    console.log(result.rows);
    if (result.rows) {
      res.status(201).json({
        success: true,
        message: "Friend added successfully",
        userId: result.rows[0],
      });
    } else {
      throw new Error("Failed to add friend");
    }
  } catch (error) {
    console.error("Error adding friend:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add friend",
    });
  }
};
const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      "SELECT * FROM friend_list WHERE user_id = $1",
      [userId]
    );
    const userFriends = result.rows;

    res.status(200).json({
      success: true,
      userFriends,
    });
  } catch (error) {
    console.error("Error geting user's friends:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to get user's friends",
    });
  }
};
const updateFriendRequest = async (req, res) => {
  try {
    const { userId, friendId, status } = req.body;

    const result = await pool.query(
      "UPDATE friend_list SET status = $1 WHERE user_id = $2 AND friend_user_id = $3",
      [status, userId, friendId]
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

module.exports = {
  addFriend,
  getUserFriends,
  updateFriendRequest,
  removeFriend,
};
