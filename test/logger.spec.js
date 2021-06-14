const assert = require('assert');
const Logger = require('../lib/logger');
const consoleOptions = require('../lib/defaultConsoleOptions');
const fileOptions = require('../lib/defaultFileOptions');

consoleOptions.level = 'info';

describe('Logger', () => {
  it('Default ctor', () => {
    const logger = new Logger({});
    assert(logger.useConsole === false);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 0);
  });
  it('Only file', () => {
    const logger = new Logger({ useFile: true });
    assert(logger.useConsole === false);
    assert(logger.useFile === true);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'file');
  });
  it('Only console', () => {
    const logger = new Logger({ useConsole: true });
    assert(logger.useConsole === true);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'console');
  });
});

describe('Console', () => {
  it('should print', () => {
    const logger = new Logger({
      label: 'my label',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    logger.info('aaa', { item: 'bbb' });
    assert(logger.useConsole === true);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'console');
  });
});

describe('File', () => {
  it('should print', () => {
    const logger = new Logger({
      label: 'my label',
      level: 'info',
      useFile: true,
      fileOptions: fileOptions,
    });

    logger.info('aaa', { item: 'bbb' });
    assert(logger.useConsole === false);
    assert(logger.useFile === true);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'file');
  });
});
