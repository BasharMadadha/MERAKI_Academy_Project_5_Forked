const express = require("express");
const {
    addcomment,
    getAllComments,
    updateCommentsById,
    deleteCommentById
} = require("../controller/comment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");


const commentRouter = express.Router();

commentRouter.post("/:id",authentication, addcomment);
commentRouter.get("/",authentication, getAllComments);
commentRouter.put("/:id",authentication, updateCommentsById);
commentRouter.delete("/:id",authentication, deleteCommentById);


module.exports = commentRouter;
