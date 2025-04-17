
const express = require("express");
const app = express();

const cors = require("cors")

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes")

app.use(cors({
    origin: "*",
  }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/upload", uploadRoutes);


module.exports = app;


