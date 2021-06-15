const winston = require('winston');
const printf = require('./options/printf');

const { format, transports, createLogger } = winston;

// Import mongodb: https://github.com/winstonjs/winston-mongodb
// Requiring 'winston-mongodb' will expose 'winston.usedTransports.MongoDB'
require('winston-mongodb');

class Logger {
  constructor({
    label = 'my label',
    level = 'error',
    preferGlobalOptions = true,
    useConsole = false,
    useFile = false,
    useMongoDB = false,
    consoleOptions = require('./defaultConsoleOptions'),
    fileOptions = require('./defaultFileOptions'),
    mongoOptions = require('./defaultMongoOptions'),
  }) {
    if (useFile && !fileOptions) throw new Error('invalid file configuration');
    if (useConsole && !consoleOptions) throw new Error('invalid console configuration');
    if (useMongoDB && !mongoOptions) throw new Error('invalid MongoDB configuration');

    this.label = label;
    this.useConsole = useConsole;
    this.useFile = useFile;
    this.useMongoDB = useMongoDB;
    this.fileOptions = fileOptions;
    this.mongoOptions = mongoOptions;
    this.consoleOptions = consoleOptions;

    this.usedTransports = [];
    this.logger = this.initialize(preferGlobalOptions, level);

    return this;
  }

  initialize(preferGlobalOptions, level) {
    if (this.logger) return;

    if (this.useConsole) {
      if (preferGlobalOptions) this.consoleOptions.level = level;
      this.consoleOptions.format = format.combine(
        format.label({ label: this.label }),
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(printf),
      );
      this.usedTransports.push(new transports.Console(this.consoleOptions));
    }

    if (this.useFile) {
      if (preferGlobalOptions) this.fileOptions.level = level;
      this.usedTransports.push(new transports.File(this.fileOptions));
    }

    if (this.useMongoDB) {
      if (preferGlobalOptions) this.mongoOptions.level = level;
      this.usedTransports.push(new transports.MongoDB(this.mongoOptions));
    }

    const logger = createLogger({
      transports: this.usedTransports,
      exitOnError: false, // do not exit on handled exceptions
      format: format.combine(
        format.label({ label: this.label }),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(printf),
      ),
    });

    // create a stream object with a 'write' function that will be used by `morgan`
    /* eslint-disable no-unused-vars */
    logger.stream = {
      // use the 'info' log level so the output will be picked up by all transports (mongodb, file, and console)
      write: (message) => {
        logger.info(message);
      },
    };
    /* eslint-enable no-unused-vars */

    return logger;
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
