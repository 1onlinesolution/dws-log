const winston = require('winston');

const { format } = winston;
const theFormat = format.combine(format.colorize({ all: false, }));

module.exports = {
  // Level of messages that this transport should log (default: level set on parent logger).
  level: 'error',

  // Boolean flag indicating whether to suppress output, defaults to false.
  silent: false,

  format: theFormat,
};
