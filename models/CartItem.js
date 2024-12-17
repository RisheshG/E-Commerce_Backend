// models/CartItem.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
