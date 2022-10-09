const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  paymentMethod: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  installments: {
    type: Number,
    required: true,
    default: 1
  }
});

module.exports = mongoose.model('Payments', Schema);
