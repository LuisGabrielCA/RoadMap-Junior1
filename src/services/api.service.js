/* eslint-disable radix */
const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const customer = require('../models/customer.entity');
const item = require('../models/item.entity');
const payment = require('../models/payment.entity');
const shipping = require('../models/shipping-address.entity');
const order = require('../models/order.entity');
const CustomException = require('../utils/custom-exception.util');

class APIService {

  async getAll({ page, limit, fields, collection }) {

    const entitys = { item, payment, shipping, order, customer };

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const parsedFields = fields ? fields.replace(',', ' ') : null;

    const result = await entitys[collection].find({}, null, {
      skip: (parsedPage - 1) * parsedLimit,
      limit: parsedLimit,
      select: parsedFields
    });

    return result;
  }

}

module.exports = { APIService };
