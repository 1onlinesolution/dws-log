module.exports = {
  // Level of messages that this transport should log, defaults to 'info'.
  level: 'error',

  // MongoDB connection uri, pre-connected MongoClient object or promise which resolves to a pre-connected MongoClient object.
  db: undefined,

  // MongoDB connection parameters (optional, defaults to {poolSize: 2, autoReconnect: true, useNewUrlParser: true}).
  options: {
    poolSize: 2,
    // autoReconnect: true, // Deprecated...
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },

  // The name of the collection you want to store log messages in, defaults to 'log'.
  collection: undefined,

  // In case this property is true, winston-mongodb will try to create new log collection as capped, defaults to false.
  capped: true,

  // Size of logs capped collection in bytes, defaults to 10000000.
  cappedMax: 1024 * 1024 * 10,

  // Boolean flag indicating whether to suppress output, defaults to false.
  silent: false,

  // Will remove color attributes from the log entry message, defaults to false.
  decolorize: true,

  // Whether the returned logs should include the _id attribute settled by mongodb, defaults to false.
  includeIds: false,

  // Label stored with entry object if defined.
  label: undefined,

  // Transport instance identifier. Useful if you need to create multiple MongoDB transports.
  name: undefined,
};