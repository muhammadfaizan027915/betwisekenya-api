require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const generateToken = async (data, expiresIn) => {
  return await jwt.sign(data, process.env.JWT_SECRET, { expiresIn });
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

const decodeToken = async (token) => {
  return await jwt.decode(token);
};

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  verifyToken,
  decodeToken,
};
