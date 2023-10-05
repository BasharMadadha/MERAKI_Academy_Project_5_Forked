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

  const getNotificationByUserId = (req, res) => {

    const id = req.params.id
    const query = `SELECT * FROM notification LEFT JOIN comments ON notification.comment_id = comments.comment_id LEFT JOIN likes ON notification.like_id = likes.like_id LEFT JOIN friend_list ON notification.friend_request = friend_list.id WHERE notification.receiver_id=${id}`;
    
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          message:` All the notification for ${id}`,
          result: result.rows,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Server error",
          err: err.message,
        });
      });
  };


  
  module.exports={
    getNotificationByUserId,
    getAllnotification
  }