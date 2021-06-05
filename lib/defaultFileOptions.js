const path = require('path');

module.exports = {
  // Level of messages that this transport should log (default: level set on parent logger).
  level: 'error',

  // The filename of the logfile to write output to.
  filename: path.resolve(__dirname, '../logs/errors.log'),

  // Max size in bytes of the logfile, if the size is exceeded then a new file is created,
  // a counter will become a suffix of the log file.
  maxsize: 1024 * 1024 * 10,

  // Limit the number of files created when the size of the logfile is exceeded.
  maxFiles: 10,

  // If true, log files will be rolled based on maxsize and maxfiles, but in ascending order.
  // The filename will always have the most recent log lines.
  // The larger the appended number, the older the log file.
  // This option requires maxFiles to be set, or it will be ignored.
  tailable: true,

  // The number of stream creation retry attempts before entering a failed state.
  // In a failed state the transport stays active but performs a NOOP on it's log function. (default 2)
  maxRetries: 2,

  // If true, all log files but the current one will be zipped.
  zippedArchive: true,

  // Boolean flag indicating whether to suppress output, defaults to false.
  silent: false,
};