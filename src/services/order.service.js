const orderSchema = require('../models/order.entity');
const CustomException = require('../utils/custom-exception.util');

class OrderService {

  async getAll() {
    return orderSchema.find();
  }

  async getOne(data) {
    return orderSchema.findOne({ _id: data.id });
  }

  async create(data) {
    const inputOrder = {
      status: data.status,
      value: data.value,
    };
    console.log(inputOrder);
    return orderSchema.create(inputOrder);
  }

  async update(data) {
    const order = await orderSchema.findOne({ _id: data.id });
    if (!order) {
      throw new CustomException({ title: 'Item not found!' });
    }

    const updateOrder = {
      ean: data.ean || order.ean,
      quantity: data.quantity || order.quantity,
      name: data.name || order.name,
      refId: data.refId || order.refId,
      price: data.price || order.price,
      listPrice: data.listPrice || order.listPrice
    };
    return orderSchema.updateOne({ _id: data.id }, updateOrder);
  }

  async delete(data) {
    const order = await orderSchema.findOne({ _id: data.id });
    if (!order) {
      throw new CustomException({ title: 'Item not found!' });
    }
    return orderSchema.deleteOne({ _id: data.id });
  }
}

module.exports = { OrderService };
