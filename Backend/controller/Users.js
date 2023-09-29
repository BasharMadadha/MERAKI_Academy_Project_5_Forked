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
    const user = findUser.rows[0];

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
      user: user,
    };
    const secretKey = process.env.SECRET || "dark";
    const token = jwt.sign(payload, secretKey, { expiresIn: "60m" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: token,
      userId: user.id,
      role: user.role,
      user: user,
    });
  } catch (error) {
    console.error(`Error creating acount`, error);
    return res.status(500).json({
      message: "Error creating acount",
      success: false,
    });
  }
};

const getAllUsers = (req, res) => {
  try {
    const getAllUsers = `SELECT * FROM users`;
    pool.query(getAllUsers, (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err);
  }
};

const userByUserName = (req, res) => {
  try {
    const username = req.params.username;
    const query = `SELECT * FROM users WHERE username LIKE $1`;
    const data = ["%" + username + "%"];
    pool.query(query, data).then((result) => {
      if (result) {
        res.status(201).json({
          success: true,
          data: result.rows,
          // name: result,
        });
      }
    });
  } catch (err) {
    res.status(401);
    res.json({
      success: false,
      message: err.message,
    });
  }
};

const getUserById = (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM users WHERE id = $1`;
    const data = [id];
    pool.query(query, data).then((result) => {
      if (result) {
        res.status(201).json({
          success: true,
          message: `The posts with id: ${id}`,
          data: result.rows[0],
        });
      }
    });
  } catch (err) {
    res.status(401);
    res.json({
      success: false,
      message: "Server error",
      message: err.message,
    });
  }
};

const updateUserById = (req, res) => {
  const user_id = req.token.userId;
  const { password, confirm_password, old_password } = req.body;

  // Check if new_password and confirm_password match.
  if (password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  // First, check if old_password matches the current hashed password for the user.
  pool
    .query("SELECT password FROM users WHERE id = $1", [user_id])
    .then((result) => {
      if (result.rows.length === 1) {
        const currentHashedPassword = result.rows[0].password;

        // Use bcrypt to compare old_password with the hashed password.
        return bcrypt.compare(old_password, currentHashedPassword);
      } else {
        throw new Error("User not found");
      }
    })
    .then((passwordsMatch) => {
      if (passwordsMatch) {
        // Hash the new password before updating the database.
        return bcrypt.hash(password, 10); // Adjust the number of salt rounds as needed.
      } else {
        throw new Error("Old password does not match the current password");
      }
    })
    .then((hashedPassword) => {
      // Now, we have the hashed new password, and we can proceed with the update.
      const updateQuery = `
        UPDATE users
        SET
        password = COALESCE($1, password)
        WHERE id = $2
        RETURNING *;
      `;
      const data = [hashedPassword || null, user_id];

      return pool.query(updateQuery, data);
    })
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `User with id: ${user_id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating user");
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

const updateUserImage = (req, res) => {
  const user_id = req.token.userId;
  const { image, username, confirm_username } = req.body;

  if (username !== confirm_username) {
    return res.status(400).json({
      success: false,
      message: "New username and confirm username do not match",
    });
  }

  const query = `UPDATE users
                 SET
                 image = COALESCE($1, image),
                 username = COALESCE($2, username)
                 WHERE id = $3
                 RETURNING *;`;
  const data = [image || null, username || null, user_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `User with id: ${user_id} updated successfully`,
          result: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating user");
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

module.exports = {
  register,
  login,
  getAllUsers,
  userByUserName,
  getUserById,
  updateUserById,
  updateUserImage,
};
