const customerSchema = require('../models/customer.entity');
const CustomException = require('../utils/custom-exception.util');

class CustomerService {

  async getAll() {
    return customerSchema.find();
  }

  async getOne(data) {
    return customerSchema.findOne({ _id: data.id });
  }

  async create(data) {
    const customer = await customerSchema.findOne({ email: data.email });
    if (customer) {
      throw new CustomException({ title: 'Customer already created!' });
    }

    const inputCustomer = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      documentType: data.documentType,
      document: data.document,
      phone: data.phone,
      isCorporate: data.isCorporate
    };
    return customerSchema.create(inputCustomer);
  }

  async update(data) {
    const customer = await customerSchema.findOne({ _id: data.id });
    if (!customer) {
      throw new CustomException({ title: 'Item not found!' });
    }

    const updateItem = {
      email: data.email || customer.email,
      firstName: data.firstName || customer.firstName,
      lastName: data.lastName || customer.lastName,
      documentType: data.documentType || customer.documentType,
      document: data.document || customer.document,
      phone: data.phone || customer.phone,
      isCorporate: data.isCorporate || customer.isCorporate
    };
    return customerSchema.updateOne({ _id: data.id }, updateItem);
  }

  async delete(data) {
    const customer = await customerSchema.findOne({ _id: data.id });
    if (!customer) {
      throw new CustomException({ title: 'Item not found!' });
    }
    return customerSchema.deleteOne({ _id: data.id });
  }
}

module.exports = { CustomerService };
