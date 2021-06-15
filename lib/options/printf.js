module.exports = ({ label, level, timestamp, message, ...metadata }) => {
  let msg = (typeof message === 'string') ? message : JSON.stringify(message);
  let log_text = `${timestamp} [${label}] - [${level}]: ${msg}`;
  if (metadata) {
    log_text += '\n';
    if (metadata instanceof Error) {
      log_text += metadata.message;
      log_text += '\n';
      log_text += metadata.stack;
    } else {
      const extra = '\t' + JSON.stringify(metadata);
      log_text += extra;
    }
  }
  return log_text;
};
