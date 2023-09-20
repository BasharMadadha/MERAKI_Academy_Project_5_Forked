const { pool, bcrypt } = require("../models/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  try {
    const { username, password, email, image, role_id } = req.body;
    const theEmail = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(theEmail, [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = `INSERT INTO users
    (username,password,email,image,role_id)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING id`;
    const userData = await pool.query(newUser, [
      username,
      hashedPassword,
      email,
      image,
      role_id,
    ]);
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      userId: userData.rows[0].id,
    });
  } catch (error) {
    console.error(`Error creating acount`, error);
    return res.status(500).json({
      message: "Error creating acount",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await pool.query(`SELECT * FROM users WHERE email =$1`, [
      email,
    ]);
    if (findUser.rows.length === 0) {
      return res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
      });
    }
    console.log(findUser.rows[0]);
    const user = findUser.rows[0];
    console.log(user);
    const thePassword = await bcrypt.compare(password, user.password);
    if (!thePassword) {
      return res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
      });
    }
    const payload = {
      userId: user.id.toString(),
      role: user.role,
      username: user.username,
    };
    const secretKey = process.env.SECRET || "dark";
    const token = jwt.sign(payload, secretKey, { expiresIn: "60m" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      userId: user.id,
      role: user.role,
    });
  } catch (error) {
    console.error(`Error creating acount`, error);
    return res.status(500).json({
      message: "Error creating acount",
      success: false,
    });
  }
};

module.exports = {
  register,
  login,
};
