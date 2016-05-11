/**
 * Created by kim on 2016-05-11.
 */

import logger from './../util/logger'
import compression from 'compression';
import path from 'path'
import bodyParser from 'body-parser'
import morgan from 'morgan'

const configInit = (server, express) => {

  let api = express.Router();

  api.use(clientErrorHandler);

  function clientErrorHandler(err, req, res, next) {
    logger.log("error", "Something wrong with an XHR request", err.stack);

    if (req.xhr) {
      res.send(500, {error: 'Something blew up!'});
    } else {
      next(err);
    }
  }
  logger.debug("Enabling GZip compression.");
  server.use(compression());
  logger.debug("Setting static folder");
  server.use(express.static(path.dirname(module.parent.filename) + '/../../dist'));
  logger.debug("Setting views folder");
  server.set('views', path.dirname(module.parent.filename) + '/views');
  logger.debug("Setting 'ejs' as view engine");
  server.set('view engine', 'ejs');
  logger.debug("Setting parse urlencoded request bodies into req.body.");
  server.use(bodyParser.urlencoded());
  server.use(bodyParser.json());
  logger.debug("Overriding 'express' logger");
  server.use(morgan ({ "stream": logger.stream }));

}

module.exports = configInit;
