/**
 * Logger for the server-side node application.
 *
 * Created by kim on 2016-05-11.
 */

import winston from 'winston'

winston.emitErrs = true;
const env = process.env.NODE_ENV || 'dev';
if(env === "production") {
  let logger = new winston.Logger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: './logs/all-logs.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });

  module.exports = logger;
  module.exports.stream = {
    write: function (message) {
      logger.info(message);
    }
  };
}else {
  let logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
      })
    ],
    exitOnError: false
  });

  module.exports = logger;
  module.exports.stream = {
    write: function (message) {
      logger.info(message);
    }
  };
}
