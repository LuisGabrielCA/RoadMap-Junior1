const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { OrderService } = require('../services/order.service');

const orderService = new OrderService({});
const { Router } = require('express');

const router = Router();


router.get('/', async (req, res) => {
  const { page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const orders = await orderService.getAll();

  const paginateOrders = orders.slice(startIndex, endIndex);

  return res.send(paginateOrders);
});

router.get('/id', async (req, res) => {

  const customer = await orderService.getOne({ id: req.params.id });

  return res.send(customer);

});

router.post('/', async (req, res) => {
  try {
    const order = await orderService.create(req.body);
    return res.status(CREATED).send(order);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const order = await orderService.update({ ...req.body, id: req.params.id });
    return res.status(OK).send(order);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const order = await orderService.delete({ id: req.params.id });
    return res.status(OK).send(order);
  } catch (error) {
    return res.status(NOT_FOUND).send(error);
  }
});

module.exports = router;
