const {pool}= require("../models/db")



  const getAllnotification = (req, res) => {
    const query = `SELECT * FROM notification`;
  
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          message: "All the notification",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err,
        });
      });
  };

;

  const getNotificationsWithLikeId = async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM notification
        WHERE like_id IS NOT NULL;
      `;
  
      const result = await pool.query(query);
  
      res.status(200).json({
        success: true,
        message: "Notifications with like_id retrieved successfully",
        notifications: result.rows,
      });
    } catch (error) {
      console.error("Error retrieving notifications:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve notifications",
        error: error.message,
      });
    }
  };
  
  const getNotificationsWithFriendRequest = async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM notification
        WHERE friend_request IS NOT NULL;
      `;
  
      const result = await pool.query(query);
  
      res.status(200).json({
        success: true,
        message: "Notifications with friend_request retrieved successfully",
        notifications: result.rows,
      });
    } catch (error) {
      console.error("Error retrieving notifications:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve notifications",
        error: error.message,
      });
    }
  };
  const getNotificationsWithCommentId = async (req, res) => {
    try {
      const query = `
        SELECT *
        FROM notification
        WHERE comment_id IS NOT NULL;
      `;
  
      const result = await pool.query(query);
  
      res.status(200).json({
        success: true,
        message: "Notifications with comment_id retrieved successfully",
        notifications: result.rows,
      });
    } catch (error) {
      console.error("Error retrieving notifications:", error.message);
      res.status(500).json({
        success: false,
        message: "Failed to retrieve notifications",
        error: error.message,
      });
    }
  };
  
  
  module.exports={
    // notification,
    getAllnotification,getNotificationsWithLikeId,
    getNotificationsWithFriendRequest,
    getNotificationsWithCommentId,

  }