const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    default: ''
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true,
    default: ''
  },
  document: {
    type: String,
    required: true,
    default: ''
  },
  phone: {
    type: String,
    required: true,
    default: ''
  },
  isCorporate: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = mongoose.model('Customers', Schema);
