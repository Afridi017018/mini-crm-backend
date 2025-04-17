const express = require("express");
const router = express.Router();
const multer = require("multer");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { uploadCSV } = require("../controllers/uploadController");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 }, 
});

router.post("/", auth, isAdmin, upload.single("file"), uploadCSV);

module.exports = router;
