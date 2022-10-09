const express = require('express');
const cors = require('cors');
const {
  StatusCodes: {
    OK
  }
} = require('http-status-codes');
const logger = require('./config/logger');
const { PORT } = require('./config/env');
const customerRoute = require('./controllers/customer.controller');
const paymentRoute = require('./controllers/payment.controller');
const shippingRoute = require('./controllers/shipping-address.controller');
const orderRoute = require('./controllers/order.controller');
const itemRoute = require('./controllers/item.controller');
const apiRoute = require('.//controllers/api.controller');
const DBServer = require('./infrastructure/db/db.server.js');

const db = new DBServer({});
db.connect()
  .then(() => {
    logger.info('Database Connected!');
  })
  .catch((error) => {
    logger.error(`Database Connection fail: ${error}`);
  });

const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

router.get('/healthcheck', (req, res) => {
  res.status(OK).send('ok');
});

router.use('/customer', customerRoute);
router.use('/payment', paymentRoute);
router.use('/shipping', shippingRoute);
router.use('/item', itemRoute);
router.use('/order', orderRoute);
router.use('/api', apiRoute);

app.listen(PORT, () => {
  logger.info(`Started on port ${PORT}`);
});
