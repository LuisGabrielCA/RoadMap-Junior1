const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { ItemService } = require('../services/item.service');

const itemService = new ItemService({});
const { Router } = require('express');

const router = Router();

router.get('/', async (req, res) => {

  const { page, perPage, fields } = req.query;

  const items = await itemService.getAll({ page, perPage, fields });

  return res.send(items);
});

router.get('/id', async (req, res) => {

  const item = await itemService.getOne({ id: req.params.id });

  return res.send(item);

});

router.post('/', async (req, res) => {
  try {
    const item = await itemService.create(req.body);
    return res.status(CREATED).send(item);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await itemService.update({ ...req.body, id: req.params.id });
    return res.status(OK).send(item);
  } catch (error) {
    return res.status(BAD_REQUEST).send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await itemService.delete({ id: req.params.id });
    return res.status(OK).send(item);
  } catch (error) {
    return res.status(NOT_FOUND).send(error);
  }
});

module.exports = router;
