const { pool } = require("../models/db");


const addCardsFromApi = (req, res) => {
  const api_url =
    "https://db.ygoprodeck.com/api/v7/cardinfo.php?archetype=Blue-Eyes";

  fetch(api_url)
    .then((response) => response.json())
    .then((apiData) => {
      if (apiData) {
        const cardData = apiData.data[34];

        const { name, desc, card_images, archetype, atk, card_prices } =
          cardData;

        const query = `INSERT INTO app_cards (card_name, card_description, card_image, archetype, attack, card_prices) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

        const data = [
          name,
          desc,
          card_images[0].image_url,
          archetype,
          atk,
          Math.round(parseFloat(card_prices[0].amazon_price)),
        ];

        pool
          .query(query, data)
          .then((result) => {
            res.status(200).json({
              success: true,
              message: "Card created successfully",
              result: result.rows[0],
            });
          })
          .catch((err) => {
            res.status(500).json({
              success: false,
              message: "Server error",
              err: err.message,
            });
          });
      } else {
        res.status(500).json({
          success: false,
          message: "API response does not contain card data",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Failed to fetch data from the API",
        err: err.message,
      });
    });
};

const addCard = (req, res) => {
  const {
    card_name,
    card_description,
    card_image,
    archetype,
    attack,
    card_prices,
  } = req.body;

  const query = `INSERT INTO app_cards (card_name, card_description, card_image, archetype, attack, card_prices) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
  const data = [
    card_name,
    card_description,
    card_image,
    archetype,
    attack,
    card_prices,
  ];
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Card created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getAllCards = (req, res) => {
  try {
    const getAllCards = `SELECT * FROM app_cards`;
    pool.query(getAllCards, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

const deleteCardById = (req, res) => {
  const card_id = req.params.id;
  const query = `DELETE FROM app_cards 
    WHERE card_id = $1;`;
  const data = [card_id];
  pool
    .query(query, data)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `Card with id:  deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting Card");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const buyCard = async (req, res) => {
  const { card_id } = req.body;
  const user_id = req.token.userId;

  try {
    const cardQuery = await pool.query(
      "SELECT card_prices FROM app_cards WHERE card_id = $1",
      [card_id]
    );

    if (cardQuery.rows.length === 0) {
      return res.status(400).json({ message: "Card not found" });
    }

    const cardPrice = cardQuery.rows[0].card_prices;

    const userQuery = await pool.query(
      "SELECT crypto_amount FROM users WHERE id = $1",
      [user_id]
    );

    if (userQuery.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const userCryptoAmount = userQuery.rows[0].crypto_amount;

    await pool.query("BEGIN");

    if (userCryptoAmount >= cardPrice) {

      await pool.query(
        "UPDATE users SET crypto_amount = crypto_amount - $1 WHERE id = $2",
        [cardPrice, user_id]
      );

      await pool.query(
        "INSERT INTO user_cards (user_id, card_id) VALUES ($1, $2)",
        [user_id, card_id]
      );

      await pool.query("COMMIT");

      res.status(200).json({ message: "Card purchased successfully" });
    } else {

      await pool.query("ROLLBACK");
      res
        .status(400)
        .json({ message: "Insufficient crypto balance to buy this card" });
    }
  } catch (error) {
    console.error("Error buying card:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

 const getCardById = async (req, res) => {
    const cardId = req.params.id;
  
    try {
      const { rows } = await pool.query('SELECT * FROM app_cards WHERE card_id = $1', [cardId]);
  
      if (rows.length === 0) {
        res.status(404).json({ error: 'Card not found' });
      } else {
        res.json(rows[0]);
      }
    } catch (error) {
        console.error(error.message);
              res.status(500).json({ error: 'Internal server error' });
    }
  };


module.exports = {
  addCardsFromApi,
  getAllCards,
  deleteCardById,
  addCard,
  getCardById,
  buyCard
};


  
 





