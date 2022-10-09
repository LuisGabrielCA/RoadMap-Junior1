const shippingSchema = require('../models/shipping-address.entity');
const CustomException = require('../utils/custom-exception.util');

class ShippingService {

  async getAll() {
    return shippingSchema.find();
  }

  async getOne(data) {
    return shippingSchema.findOne({ _id: data.id });
  }

  async create(data) {

    const inputShipping = {
      addressType: data.addressType,
      receiverName: data.receiverName,
      postalCode: data.postalCode,
      city: data.city,
      state: data.state,
      country: data.country,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      complement: data.complement
    };
    return shippingSchema.create(inputShipping);
  }

  async update(data) {
    const shipping = await shippingSchema.findOne({ _id: data.id });
    if (!shipping) {
      throw new CustomException({ title: 'Shipping Address not found!' });
    }

    const updateShipping = {
      addressType: data.addressType || shipping.addressType,
      receiverName: data.receiverName || shipping.receiverName,
      postalCode: data.postalCode || shipping.postalCode,
      city: data.city || shipping.city,
      state: data.state || shipping.state,
      country: data.country || shipping.country,
      street: data.street || shipping.street,
      number: data.number || shipping.number,
      neighborhood: data.neighborhood || shipping.neighborhood,
      complement: data.complement || shipping.complement
    };
    return shippingSchema.updateOne({ _id: data.id }, updateShipping);
  }

  async delete(data) {
    const shipping = await shippingSchema.findOne({ _id: data.id });
    if (!shipping) {
      throw new CustomException({ title: 'Shipping Address not found!' });
    }
    return shippingSchema.deleteOne({ _id: data.id });
  }
}

module.exports = { ShippingService };
