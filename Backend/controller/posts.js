const {pool} = require("../models/db");

const createNewPost = (req, res) => {
  const { title, body } = req.body;
  const user_id = req.token.userId;
  const query = `INSERT INTO posts (title, body, user_id) VALUES ($1,$2,$3) RETURNING *;`;
  const data = [title, body, user_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Post created successfully",
        result: result.rows[0],
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

const getAllPosts = (req, res) => {
  const query = `SELECT * FROM posts a WHERE a.is_deleted=0;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the posts",
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

const getPostsByUser = (req, res) => {
  const user_id = req.query.user;
  const query = `SELECT * FROM posts WHERE user_id = $1 AND is_deleted=0;`;
  const data = [user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${user_id} has no posts`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All posts for the user: ${user_id}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getPostById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT title,body,user_id FROM users INNER JOIN posts ON users.id=posts.user_id WHERE posts.id=$1 AND posts.is_deleted=0;`;
  const data = [id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The posts with id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting post");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updatePostById = (req, res) => {
  const id = req.params.id;
  let { title, body } = req.body;

  const query = `UPDATE posts SET title = COALESCE($1,title), body = COALESCE($2, body) WHERE id=$3 AND is_deleted = 0  RETURNING *;`;
  const data = [title || null, body || null, id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `post with id: ${id} updated successfully `,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating post");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
//

const deletePostById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE posts SET is_deleted=1 WHERE id=$1;`;
  const data = [id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `posts with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting post");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const deletePostByUser = (req, res) => {
  const user_id = req.params.id;
  const query = `UPDATE posts SET is_deleted=1 WHERE user_id=$1 ;`;
  const data = [user_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `post with user: ${user_id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting post");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  getAllPosts,
  getPostsByUser,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
  deletePostByUser,
};
