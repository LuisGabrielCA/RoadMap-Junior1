const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  ean: {
    type: String,
    require: true,
    default: ''
  },
  quantity: {
    type: Number,
    require: true,
    default: 1
  },
  name: {
    type: String,
    require: true,
    default: ''
  },
  refId: {
    type: String,
    require: true,
    default: ''
  },
  price: {
    type: Number,
    default: 123
  },
  listPrice: {
    type: Number,
    default: 1234
  }
});

module.exports = mongoose.model('Item', Schema);
