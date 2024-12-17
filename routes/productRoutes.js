const express = require('express');
const Product = require('../models/Product');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});


router.post('/', async (req, res) => {
  const { name, price, description, imageUrl, stock } = req.body;
  try {
    const newProduct = new Product({ name, price, description, imageUrl, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error creating product', error: err });
  }
});

module.exports = router;
