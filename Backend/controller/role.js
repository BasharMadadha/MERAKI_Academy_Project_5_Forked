const { pool } = require("../models/db");

const addrole = async (req, res, next) => {
  try {
    const { role_name } = req.body;

    const query = `INSERT INTO role (role_name) VALUES ($1) RETURNING *`;
    const values = [role_name];
    const response = await pool.query(query, values);

    if (response.rowCount) {
      res.status(201).json({
        success: true,
        message: "role created successfully",
        response: response.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const getAllRoles = (req, res) => {
  const query = `SELECT * FROM role;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the roles",
        result: result,
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

const beAdmin = async (req, res) => {
  try {
    const { userId, newRoleId, newCryptoAmount } = req.body;
    const newData = await pool.query(
      "UPDATE users SET role_id = $1, crypto_amount = $2 WHERE id = $3",
      [newRoleId, newCryptoAmount, userId]
    );
    console.log(`Role and crypto amount updated for user with ID ${userId}`);
    res.status(200).json({
      success: true,
      message: "All the roles",
      result: newData.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  addrole,
  getAllRoles,
  beAdmin
};
