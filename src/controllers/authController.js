const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const { findUserByUsername } = require("../models/userModel");

exports.login = async (req, res) => {

  const { userId, password } = req.body;
  const user = await findUserByUsername(userId);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ user: user?.username, token });
};
