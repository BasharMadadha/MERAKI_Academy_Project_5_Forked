const express = require("express");

const {
  addCardsFromApi,
  getAllCards,
  deleteCardById,
  addCard,
  buyCard,
  getCardById,
  moreCard,
  getRandomCards
} = require("../controller/cards");
const authentication = require("../middleware/authentication");

const cardRouter = express.Router();

cardRouter.post("/api", addCardsFromApi);
cardRouter.post("/", addCard);
cardRouter.get("/", getAllCards);
cardRouter.delete("/:id", deleteCardById);
cardRouter.post("/buy", authentication, buyCard);
cardRouter.get('/cardWithId',getCardById)
cardRouter.post('/moreCard',moreCard)
cardRouter.post('/getRandomCards',getRandomCards)


module.exports = cardRouter;

