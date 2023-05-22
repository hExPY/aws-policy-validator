import config from 'config';
import winston from 'winston';

const loggingConfig = config.get("logging")

const logger = winston.createLogger({ ...loggingConfig,...{
    transports: [
      new (winston.transports.Console)(),
    ]
  }
})

export default logger;
