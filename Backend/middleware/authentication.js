const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ").pop();
 

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  }

  try {
    const trueToken = jwt.verify(token, process.env.SECRET);
    console.log(trueToken);

    if (trueToken) {
      req.token = trueToken;

      next();
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "The token is invalid or expired",
    });
  }
};

module.exports = authentication;