const customerModel = require("../models/customerModel");

exports.getCustomers = async (req, res) => {
  const { search, tag, page = 1, limit = 10 } = req.query; 
  try {
    const customers = await customerModel.getCustomers(search, tag, page, limit);
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
  
exports.createCustomer = async (req, res) => {
  const newCustomer = await customerModel.createCustomer(req.body);
  res.status(201).json(newCustomer);
};

exports.updateCustomer = async (req, res) => {
  const updated = await customerModel.updateCustomer(req.params.id, req.body);
  res.json(updated);
};

exports.deleteCustomer = async (req, res) => {
  await customerModel.deleteCustomer(req.params.id);
  res.status(204).end();
};

exports.getCustomerCount = async (req, res) => {
  try {
    const count = await customerModel.getCount();
    res.status(200).json({ count });
  } catch (err) {
    console.error('Error fetching customer count:', err);
    res.status(500).json({ message: 'Failed to retrieve customer count' });
  }
};