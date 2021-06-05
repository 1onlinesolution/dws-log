const winston = require('winston');

// Import mongodb: https://github.com/winstonjs/winston-mongodb
// Requiring 'winston-mongodb' will expose 'winston.transports.MongoDB'
require('winston-mongodb');

const isProduction = process.env.NODE_ENV === 'production';

class Logger {
  constructor({
    level = 'error',
    preferGlobalOptions = true,
    useConsole = !isProduction,
    useFile = true,
    useMongoDB = false,
    consoleOptions = require('./defaultConsoleOptions'),
    fileOptions = require('./defaultFileOptions'),
    mongoOptions = require('./defaultMongoOptions'),
  }) {
    this.useConsole = useConsole;
    this.useFile = useFile;
    this.useMongoDB = useMongoDB;
    this.fileOptions = fileOptions;
    this.mongoOptions = mongoOptions;
    this.consoleOptions = consoleOptions;

    this.transports = [];
    if (this.useConsole) {
      if (preferGlobalOptions) this.consoleOptions.level = level;
      this.transports.push(new winston.transports.Console(this.consoleOptions));
    }

    if (this.useFile) {
      if (preferGlobalOptions) this.fileOptions.level = level;
      this.transports.push(new winston.transports.File(this.fileOptions));
    }

    if (this.useMongoDB) {
      if (preferGlobalOptions) this.mongoOptions.level = level;
      this.transports.push(new winston.transports.MongoDB(this.mongoOptions));
    }

    const logger = winston.createLogger({
      transports: this.transports,
      exitOnError: false, // do not exit on handled exceptions
    });

    // create a stream object with a 'write' function that will be used by `morgan`
    /* eslint-disable no-unused-vars */
    logger.stream = {
      // use the 'info' log level so the output will be picked up by both transports (mongodb and console)
      write: (message) => {
        logger.info(message);
      },
    };
    /* eslint-enable no-unused-vars */

    this.logger = logger;

    return this;
  }

  get stream() {
    return this.logger.stream;
  }

  warn(message, meta) {
    return this.logger.warn(message, meta);
  }

  info(message, meta) {
    return this.logger.info(message, meta);
  }

  error(message, meta) {
    return this.logger.error(message, meta);
  }
}

module.exports = Logger;
