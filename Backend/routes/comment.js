const express = require("express");
const {
    addcomment,
    updateCommentsById,
    deleteCommentById
} = require("../controller/comment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const commentRouter = express.Router();

commentRouter.post("/:id",authentication, addcomment);
commentRouter.put("/:id", updateCommentsById);
commentRouter.delete("/:id",deleteCommentById);


module.exports = commentRouter;
