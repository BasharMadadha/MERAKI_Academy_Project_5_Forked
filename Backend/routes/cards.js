const express = require("express");
const { getAllCards, getCardById } = require("../controller/cards");
const cardRouter = express.Router();

cardRouter.get("/getcard",getAllCards)
cardRouter.get('/cardWithId',getCardById)

module.exports = cardRouter;
