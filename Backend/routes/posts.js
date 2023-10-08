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
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const postsRouter = express.Router();

postsRouter.get("/", authentication, getAllPosts);

postsRouter.get("/search_1/:id", getPostsByUser);

postsRouter.get("/search_2/:id", getPostById);

postsRouter.post("/", authentication, createNewPost);
postsRouter.put("/:id", updatePostById);

postsRouter.delete("/:id/user", deletePostByUser);
postsRouter.delete("/:id", deletePostById);

module.exports = postsRouter;
