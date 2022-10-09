const {
  StatusCodes: {
    CREATED,
    BAD_REQUEST,
    NOT_FOUND,
    OK
  }
} = require('http-status-codes');
const { APIService } = require('../services/api.service');
const { CustomException } = require('../utils/custom-exception.util');

const apiService = new APIService({});
const { Router } = require('express');

const router = Router();


router.get('/', async (req, res) => {
  try {
    const { page, limit, fields, collection } = req.query;

    const result = await apiService.getAll({ page, limit, fields, collection });

    console.log(result);

    if (!result.lenght) {
      throw new CustomException({ title: 'Collection not found', status: BAD_REQUEST });
    }

    return res.send(result);

  } catch (error) {
    return res.status;
  }

});


module.exports = router;
