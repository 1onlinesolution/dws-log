module.exports = ({ label, level, timestamp, message, ...metadata }) => {
  let msg = `${timestamp} [${label}] - [${level}]: ${message}`;
  if (metadata) {
    msg += '\n';
    if (metadata instanceof Error) {
      msg += metadata.message;
      msg += '\n';
      msg += metadata.stack;
    } else {
      const extra = '\t' + JSON.stringify(metadata);
      msg += extra;
    }
  }
  return msg;
};
