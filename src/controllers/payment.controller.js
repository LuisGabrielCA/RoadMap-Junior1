const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { PaymentService } = require('../services/payment.service');

const paymentService = new PaymentService({});
const { Router } = require('express');

const router = Router();


router.get('/', async (req, res) => {

  const { page, limit } = req.query;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const payment = await paymentService.getAll();

  const paginatePayment = payment.slice(startIndex, endIndex);

  return res.send(paginatePayment);
});

router.get('/id', async (req, res) => {

  const customer = await paymentService.getOne({ id: req.params.id });

  return res.send(customer);

});

router.post('/', async (req, res) => {
  try {
    const payment = await paymentService.create(req.body);
    return res.status(CREATED).send(payment);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payment = await paymentService.update({ ...req.body, id: req.params.id });
    return res.status(OK).send(payment);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const payment = await paymentService.delete({ id: req.params.id });
    return res.status(OK).send(payment);
  } catch (error) {
    return res.status(NOT_FOUND).send(error);
  }
});

module.exports = router;
