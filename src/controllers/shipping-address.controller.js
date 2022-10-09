const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { ShippingService } = require('../services/shipping-address.service');

const shippingService = new ShippingService({});
const { Router } = require('express');

const router = Router();


router.get('/', async (req, res) => {

  const { page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const shipping = await shippingService.getAll();

  const paginateShipping = shipping.slice(startIndex, endIndex);

  return res.send(paginateShipping);
});

router.get('/id', async (req, res) => {

  const customer = await shippingService.getOne({ id: req.params.id });

  return res.send(customer);

});

router.post('/', async (req, res) => {
  try {
    const shipping = await shippingService.create(req.body);
    return res.status(CREATED).send(shipping);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const shipping = await shippingService.update({ ...req.body, id: req.params.id });
    return res.status(OK).send(shipping);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const shipping = await shippingService.delete({ id: req.params.id });
    return res.status(OK).send(shipping);
  } catch (error) {
    return res.status(NOT_FOUND).send(error);
  }
});

module.exports = router;
