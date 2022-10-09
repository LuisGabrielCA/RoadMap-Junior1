const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { CustomerService } = require('../services/customer.service');

const customerService = new CustomerService({});
const { Router } = require('express');

const router = Router();


router.get('/', async (req, res) => {

  const { page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const customer = await customerService.getAll();

  const paginateCustomer = customer.slice(startIndex, endIndex);

  return res.send(paginateCustomer);
});

router.get('/id', async (req, res) => {

  const customer = await customerService.getOne({ id: req.params.id });

  return res.send(customer);

});

router.post('/', async (req, res) => {
  try {
    const customer = await customerService.create(req.body);
    return res.status(CREATED).send(customer);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.put('/id', async (req, res) => {
  try {
    const customer = await customerService.update({ ...req.body, id: req.params.id });
    return res.status(OK).send(customer);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const customer = await customerService.delete({ id: req.params.id });
    return res.status(OK).send(customer);
  } catch (error) {
    return res.status(NOT_FOUND).send(error);
  }
});

module.exports = router;
