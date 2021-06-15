const assert = require('assert');
const sinon = require('sinon');
const Logger = require('../lib/logger');
const consoleOptions = require('../lib/defaultConsoleOptions');
const fileOptions = require('../lib/defaultFileOptions');

consoleOptions.level = 'info';

describe('Logger constructor', () => {
  it('Default', () => {
    const logger = new Logger({});
    assert(logger.useConsole === false);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.usedTransports !== null);
    assert(logger.usedTransports.length === 0);
  });
  it('Only file', () => {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = sinon.stub(Logger.prototype, 'initialize');

    // Test the creation, which means that the 'initialize' method was called
    const logger = new Logger({ useFile: true });
    assert(logger.useConsole === false);
    assert(logger.useFile === true);
    assert(logger.useMongoDB === false);
    assert(logger.usedTransports !== null);
    assert(logger.usedTransports.length === 0); // Normally it would be 1, and logger.usedTransports[0].name === 'file', but we use a stub...
    sinon.assert.calledOnce(initialize);

    initialize.restore();
  });
  it('Only console', () => {
    const logger = new Logger({ useConsole: true });
    assert(logger.useConsole === true);
    assert(logger.useFile === false);
    assert(logger.useMongoDB === false);
    assert(logger.usedTransports !== null);
    assert(logger.usedTransports.length === 1);
    assert(logger.usedTransports[0].name === 'console');
  });

  it('throws when consoleOptions is null', (done) => {
    assert.throws(() => {
      new Logger({ useConsole: true, consoleOptions: null });
    }, /invalid console configuration/);
    done();
  });

  it('throws when fileOptions is null', (done) => {
    assert.throws(() => {
      new Logger({ useFile: true, fileOptions: null });
    }, /invalid file configuration/);
    done();
  });

  it('throws when mongoOptions is null', (done) => {
    assert.throws(() => {
      new Logger({ useMongoDB: true, mongoOptions: null });
    }, /invalid MongoDB configuration/);
    done();
  });
});

describe('Console', () => {
  it('should call info with a string', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the info function
    const infoSpy = sinon.spy(logger, 'info');
    logger.info('aaa', { item: 'bbb' });
    assert(infoSpy.callCount === 1);
    infoSpy.restore();
  });
  it('should call info with an object', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the info function
    const infoSpy = sinon.spy(logger, 'info');
    logger.info({ message: 'aaa' }, { item: 'bbb' });
    assert(infoSpy.callCount === 1);
    infoSpy.restore();
  });
  it('should call internal info once', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    const stub = sinon.stub(logger.logger, 'info');
    logger.info({ message: 'aaa' }, { item: 'bbb' });
    sinon.assert.calledOnce(stub);
    stub.restore();
  });

  it('should call error with a string', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'error',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the error function
    const errorSpy = sinon.spy(logger, 'error');
    logger.error('aaa', { item: 'bbb' });
    sinon.assert.calledOnce(errorSpy);
    errorSpy.restore();
  });
  it('should call error with an object', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'error',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the error function
    const errorSpy = sinon.spy(logger, 'error');
    logger.error({ message: 'aaa' }, { item: 'bbb' });
    sinon.assert.calledOnce(errorSpy);
    errorSpy.restore();
  });
  it('should call internal error once', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    const stub = sinon.stub(logger.logger, 'error');
    logger.error({ message: 'aaa' }, { item: 'bbb' });
    sinon.assert.calledOnce(stub);
    stub.restore();
  });

  it('should call warn with a string', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'warn',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the warn function
    const warnSpy = sinon.spy(logger, 'warn');
    logger.warn('aaa', { item: 'bbb' });
    sinon.assert.calledOnce(warnSpy);
    warnSpy.restore();
  });
  it('should call warn with an object', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'warn',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    // Create a spy for the warn function
    const warnSpy = sinon.spy(logger, 'warn');
    logger.warn({ message: 'aaa' }, { item: 'bbb' });
    sinon.assert.calledOnce(warnSpy);
    warnSpy.restore();
  });
  it('should call internal warn once', () => {
    const logger = new Logger({
      label: 'my console',
      level: 'info',
      useConsole: true,
      consoleOptions: consoleOptions,
    });

    const stub = sinon.stub(logger.logger, 'warn');
    logger.warn({ message: 'aaa' }, { item: 'bbb' });
    sinon.assert.calledOnce(stub);
    stub.restore();
  });
});

describe('File', () => {
  it('info() is called once', () => {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = sinon.stub(Logger.prototype, 'initialize');
    const method = sinon.stub(Logger.prototype, 'info').returns(true);

    // Test the creation, which means that the 'initialize' method was called
    const logger = new Logger({
      label: 'my file',
      level: 'info',
      useFile: true,
      fileOptions: fileOptions,
    });

    assert(logger.info({ message: 'aaa' }, { item: 'bbb' }));
    sinon.assert.calledOnce(method);

    method.restore();
    initialize.restore();
  });

  it('warn() is called once', () => {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = sinon.stub(Logger.prototype, 'initialize');
    const method = sinon.stub(Logger.prototype, 'warn').returns(true);

    // Test the creation, which means that the 'initialize' method was called
    const logger = new Logger({
      label: 'my file',
      level: 'warn',
      useFile: true,
      fileOptions: fileOptions,
    });

    assert(logger.warn({ message: 'aaa' }, { item: 'bbb' }));
    sinon.assert.calledOnce(method);

    method.restore();
    initialize.restore();
  });

  it('error() is called once', () => {
    // Create a spy for the 'initialize' class method, because we do not want to create the logs/files
    const initialize = sinon.stub(Logger.prototype, 'initialize');
    const method = sinon.stub(Logger.prototype, 'error').returns(true);

    // Test the creation, which means that the 'initialize' method was called
    const logger = new Logger({
      label: 'my file',
      level: 'error',
      useFile: true,
      fileOptions: fileOptions,
    });

    assert(logger.error({ message: 'aaa' }, { item: 'bbb' }));
    sinon.assert.calledOnce(method);

    method.restore();
    initialize.restore();
  });
});
