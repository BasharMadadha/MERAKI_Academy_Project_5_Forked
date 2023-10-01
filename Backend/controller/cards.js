const { pool } = require("../models/db");



const getAllCards = async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM app_cards');
      res.json(rows);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
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
    getAllCards,
    getCardById,
    
  };
  