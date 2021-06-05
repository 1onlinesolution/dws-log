const assert = require('assert');
const Logger = require('../lib/logger');

const isProduction = process.env.NODE_ENV === 'production';

describe('Logger', () => {
  it('Default ctor', () => {
    const logger = new Logger({});
    assert(logger.useConsole === !isProduction);
    assert(logger.useFile === true);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 2);
    assert(logger.transports[0].name === 'console');
    assert(logger.transports[1].name === 'file');
  });
  it('No console', () => {
    const logger = new Logger({useFile: false});
    assert(logger.useConsole === !isProduction);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'console');
  });
  it('No file', () => {
    const logger = new Logger({useConsole: false});
    assert(logger.useConsole === false);
    assert(logger.useFile === true);
    assert(logger.useMongoDB === false);
    assert(logger.transports !== null);
    assert(logger.transports.length === 1);
    assert(logger.transports[0].name === 'file');
  });
});