import { LoggerService } from '@nestjs/common';
import { configure, getLogger } from 'log4js';

const defaultLogger = getLogger();
const defaultLoggerLevel = process.env.LOGGER_LEVEL || 'info';

const layout = {
  type: 'pattern',
  pattern: '%d{ISO8601_WITH_TZ_OFFSET} [%p] %m',
};

configure({
  appenders: {
    stdout: { type: 'stdout', layout },
    file: {
      type: 'file',
      filename: 'application.error.log',
      layout
    },
  },
  categories: {
    default: { appenders: ['stdout'], level: defaultLoggerLevel },
    error: { appenders: ['stdout', 'file'], level: 'error' },
  },
});

export class Logger implements LoggerService {
  log(message: string) {
    this.info(message);
  }

  debug(message: string) {
    defaultLogger.debug(message);
  }

  info(message: string) {
    defaultLogger.info(message);
  }

  warn(message: string) {
    defaultLogger.warn(message);
  }

  error(message: string, trace?: string) {
    const errorLogger = getLogger('error');
    if (trace) {
      errorLogger.error(`${message}\n${trace}`);
    } else {
      errorLogger.error(message);
    }
  }
}
