const express = require("express");
const {
    addcomment,
    updateCommentsById,
    deleteCommentById
} = require("../controller/comment");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const {notification} = require("../controller/notification")





const commentRouter = express.Router();
commentRouter.post("/:id",authentication, addcomment, notification);
commentRouter.put("/:id", updateCommentsById);
commentRouter.delete("/:id",deleteCommentById);


module.exports = commentRouter;
