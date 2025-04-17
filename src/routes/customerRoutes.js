const express = require('express');
const router = express.Router();
const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerCount, 
} = require('../controllers/customerController');


router.get('/', getCustomers);
router.post('/', createCustomer);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

router.get('/count', getCustomerCount);

module.exports = router;
