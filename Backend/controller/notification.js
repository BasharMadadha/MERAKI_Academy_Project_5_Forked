const {pool}= require("../models/db")

const notification = async (req, res, next) => {
    try {
        
      // const {sender_id, receiver_id, comment_id, like_id, friend_request} = req.body;
  console.log(req.body);
      const query = `INSERT INTO notification (sender_id, receiver_id, comment_id, like_id, friend_request) VALUES ($1,$2,$3,$4,$5) RETURNING *`;
      const values = [sender_id, receiver_id, comment_id, like_id, friend_request];
      const response = await pool.query(query, values);
  
      if (response.rowCount) {
        res.status(201).json({
          success: true,
          message: "A new notification was sent successfully",
          response: response.rows,
        });
      }
    } catch (error) {
        console.log(error);
      res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message,
      });
    }
  };


  
  module.exports={
    notification
  }