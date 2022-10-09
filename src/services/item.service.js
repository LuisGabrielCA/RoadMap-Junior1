/* eslint-disable radix */
const itemSchema = require('../models/item.entity');
const CustomException = require('../utils/custom-exception.util');

class ItemService {

  async getAll({ page, limit, fields }) {

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);
    const parsedFields = fields ? fields.replace(',', ' ') : null;

    const result = await itemSchema.find({}, null, {
      skip: (parsedPage - 1) * parsedLimit,
      limit: parsedLimit,
      select: parsedFields
    });

    return result;
  }

  async getOne(data) {
    return itemSchema.findOne({ _id: data.id });
  }

  async createItem(data) {
    const item = await itemSchema.findOne({ name: data.name });
    if (item) {
      throw new CustomException({ title: 'Item already created!' });
    }

    const inputItem = {
      ean: data.ean,
      quantity: data.quantity,
      name: data.name,
      refId: data.refId,
      price: data.price,
      listPrice: data.listPrice
    };
    return itemSchema.create(inputItem);
  }

  async update(data) {
    const item = await itemSchema.findOne({ _id: data.id });
    if (!item) {
      throw new CustomException({ title: 'Item not found!' });
    }

    const updateItem = {
      ean: data.ean || item.ean,
      quantity: data.quantity || item.quantity,
      name: data.name || item.name,
      refId: data.refId || item.refId,
      price: data.price || item.price,
      listPrice: data.listPrice || item.listPrice
    };
    return itemSchema.updateOne({ _id: data.id }, updateItem);
  }

  async delete(data) {
    const item = await itemSchema.findOne({ _id: data.id });
    if (!item) {
      throw new CustomException({ title: 'Item not found!', status: 'NOT_FOUND' });
    }
    return itemSchema.deleteOne({ _id: data.id });
  }
}

module.exports = { ItemService };
