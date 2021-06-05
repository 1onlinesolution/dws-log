const winston = require('winston');

const { format } = winston;
const { combine, splat, timestamp, printf } = format;

// https://github.com/winstonjs/winston/blob/2625f60c5c85b8c4926c65e98a591f8b42e0db9a/README.md#logging-levels
// https://github.com/winstonjs/winston/blob/2625f60c5c85b8c4926c65e98a591f8b42e0db9a/README.md#creating-custom-formats
const myFormat = printf(({ level, message, label, timestamp /*, ...metadata*/ }) => {
  // let msg = `${timestamp} [${label}] [${level}]: ${message}`;
  // if (metadata) {
  //   const extra = ' ' + JSON.stringify(metadata);
  //   msg += extra;
  // }
  // return msg;
  return `${timestamp} [${label}] [${level}]: ${message}`;
});

const theFormat = combine(format.label({ label: 'dws-console' }), timestamp(), format.colorize(), splat(), myFormat);

module.exports = {
  // Level of messages that this transport should log (default: level set on parent logger).
  level: 'error',

  // Boolean flag indicating whether to suppress output, defaults to false.
  silent: false,

  format: theFormat,
};
