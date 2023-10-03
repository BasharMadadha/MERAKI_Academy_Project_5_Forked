const { pool } = require("../models/db");

const sendFreindReq = async (req, res) => {
  try {
    const { reqsFrom, reqsTo } = req.body;

    const existingFriendship = await pool.query(
      "SELECT * FROM friend_list WHERE (user_id = $1 AND friend_user_id = $2 AND id = $3) OR (user_id = $2 AND friend_user_id = $1)",
      [reqsFrom, reqsTo, reqId]
    );

    if (existingFriendship.rows.length > 0) {
      throw new Error("Friend relationship already exists");
    }
    if (reqsFrom === reqsTo) {
      throw new Error("Cannot add yourself as a friend");
    }

    const insertResult = await pool.query(
      `INSERT INTO friend_list (user_id, friend_user_id, status, created_at) 
        VALUES ($1, $2, $3, NOW()) RETURNING friend_user_id`,
      [reqsFrom, reqsTo, "pending"]
    );

    const userDataFrom = await pool.query(
      "SELECT username, image FROM users WHERE id = $1",
      [reqsFrom]
    );

    const userDataTo = await pool.query(
      "SELECT username, image FROM users WHERE id = $1",
      [reqsTo]
    );

    const insertNotificationQuery = `INSERT INTO notification (sender_id, receiver_id)VALUES ($1,$2);`;
    const notificationData = [reqsFrom, reqsTo];

    const notificatioResult = await pool.query(
      insertNotificationQuery,
      notificationData
    );

    if (userDataFrom.rows.length > 0 && userDataTo.rows.length > 0) {
      const { username: usernameFrom, image: imageFrom } = userDataFrom.rows[0];
      const { username: usernameTo, image: imageTo } = userDataTo.rows[0];

      res.status(201).json({
        success: true,
        message: "Friend request sent successfully",
        result: {
          usernameFrom,
          imageFrom,
          usernameTo,
          imageTo,
          userId: reqsTo,
        },
      });
    } else {
      throw new Error("User not found");
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
