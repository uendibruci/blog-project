const jwt = require("jsonwebtoken");

const signJWTToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN });
  return token;
};

module.exports = signJWTToken;
