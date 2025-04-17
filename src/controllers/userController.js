const userModel = require("../models/userModel");

exports.getTotalUsers = async (req, res) => {
    try {
      const count = await userModel.getUserCount();
      res.status(200).json({ count });
    } catch (err) {
      console.error("Error fetching user count:", err);
      res.status(500).json({ message: "Failed to retrieve user count" });
    }
  };