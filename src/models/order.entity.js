const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    default: 'handling'
  },
  value: {
    type: Number,
    required: true
  },
  items: {
    type: String,
    require: true
  },
  clientProfileData: {
    type: String,
    require: true
  },
  shippingAddress: {
    type: String,
    require: true
  },
  paymentData: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Order', Schema);
