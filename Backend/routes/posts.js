const express = require("express");
const {
  getAllPosts,
  getPostsByUser,
  getPostById,
  createNewPost,
  updatePostById,
  deletePostById,
  deletePostByUser,
} = require("../controller/posts");

const postsRouter = express.Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/search_1", getPostsByUser);
postsRouter.get("/search_2/:id", getPostById);

postsRouter.post("/", createNewPost);
postsRouter.put("/:id", updatePostById);

postsRouter.delete("/:id/user", deletePostByUser);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;
