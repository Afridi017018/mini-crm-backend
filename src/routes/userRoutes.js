const express = require('express');
const router = express.Router();
const {
  getTotalUsers,

} = require('../controllers/userController');



router.get('/total', getTotalUsers);

module.exports = router;
