const { pool } = require("../models/db");

const addcomment = async (req, res) => {
  const { content } = req.body;
  const user_id = req.token.userId;
  const post_id = req.params.id;


  const query = `INSERT INTO comments (content,user_id,post_id) VALUES ($1,$2,$3) RETURNING *;`;
  const data = [content,user_id,post_id];
  pool
    .query(query, data)
    .then((result) => {
      console.log(result);
      req.body.comment_id = result.rows[0].comment_id;
      req.body.sender_id = result.rows[0].user_id;
      // req.body.post_id = result.rows[0].post_id;
      next();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });


  const insertCommentQuery = 
  `  INSERT INTO comments (content, user_id, post_id)
    VALUES ($1, $2, $3)
    RETURNING *;`
  ;
  const insertNotificationQuery = 
`    INSERT INTO notification (sender_id, receiver_id,comment_id)
    VALUES ($1,$2, $3);
  ;`

  const postUser = `SELECT user_id FROM posts WHERE post_id = ${post_id}`

  const commentData = [content, user_id, post_id];
  try {
    const postUserResult = await pool.query(postUser);
    const commentResult = await pool.query(insertCommentQuery, commentData);
    const notificationData = [user_id, postUserResult.rows[0].user_id, commentResult.rows[0].comment_id];
    await pool.query(insertNotificationQuery, notificationData);
    res.status(200).json({
      success: true,
      message: 'Comment added successfully',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Server error',
      err: err.message,
    });
  }
};


const updateCommentsById = (req, res) => {
  const comment_id = req.params.id;
  const { content } = req.body;

  const query = `UPDATE comments
   SET
     content = COALESCE($1, content)
     WHERE comment_id = $2 RETURNING *;`;
  const data = [ content || null, comment_id];
  console.log(data);
  pool
    .query(query, data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: `comment with id: ${comment_id} updated successfully `,
          result: result.rows[0],
        });
    
      
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error happened while updating comment",
        err: err.message,
      });
    });
};

const deleteCommentById = (req, res) => {
  const comment_id = req.params.id;
  const query = `DELETE FROM comments WHERE comment_id=$1;`;
  const data = [comment_id];
  pool
    .query(query, data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: `comment with id:${comment_id} deleted successfully`,
        });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Error happened while deleting comment",
        err: err.message,
      });
    });
};

module.exports = {
    addcomment,
    updateCommentsById,
    deleteCommentById
};
