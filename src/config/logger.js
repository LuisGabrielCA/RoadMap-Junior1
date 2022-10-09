const winston = require('winston');
const { createLogger, transports } = require('winston');

const logger = createLogger({
  format: winston.format.json(),
  transports: [
    new transports.Console({
      level: 'debug'
    })
  ]
});

logger.stream = {
  write(message) {
    logger.info(message);
  }
};

module.exports = logger;
