const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  addressType: {
    type: String,
    required: true,
    default: 'residential'
  },
  receiverName: {
    type: String,
    require: true,
  },
  postalCode: {
    type: String,
    required: true,
    default: ''
  },
  city: {
    type: String,
    required: true,
    default: ''
  },
  state: {
    type: String,
    required: true,
    default: ''
  },
  country: {
    type: String,
    required: true,
    default: ''
  },
  street: {
    type: String,
    required: true,
    default: ''
  },
  number: {
    type: String,
    require: true,
    default: ''
  },
  neighborhood: {
    type: String,
    required: true,
    default: ''
  },
  complement: {
    type: String,
    required: true,
    default: ''
  }
});

module.exports = mongoose.model('Addresses', Schema);
