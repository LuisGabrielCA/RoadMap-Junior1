const paymentSchema = require('../models/payment.entity');
const CustomException = require('../utils/custom-exception.util');

class PaymentService {

  async getAll() {
    return paymentSchema.find();
  }

  async getOne(data) {
    return paymentSchema.findOne({ _id: data.id });
  }

  async create(data) {
    const payment = await paymentSchema.findOne({ paymentMethod: data.paymentMethod });
    if (payment) {
      throw new CustomException({ title: 'Payment Method already created!' });
    }

    const inputPayment = {
      paymentMethod: data.paymentMethod,
      value: data.value,
      installments: data.installments
    };
    return paymentSchema.create(inputPayment);
  }

  async update(data) {
    const payment = await paymentSchema.findOne({ _id: data.id });
    if (!payment) {
      throw new CustomException({ title: 'Payment Method not found!' });
    }

    const updatePayment = {
      paymentMethod: data.paymentMethod || payment.paymentMethod,
      value: data.value || payment.value,
      installments: data.installments || payment.installments
    };
    return paymentSchema.updateOne({ _id: data.id }, updatePayment);
  }

  async delete(data) {
    const payment = await paymentSchema.findOne({ _id: data.id });
    if (!payment) {
      throw new CustomException({ title: 'Payment Method not found!' });
    }
    return paymentSchema.deleteOne({ _id: data.id });
  }
}

module.exports = { PaymentService };
