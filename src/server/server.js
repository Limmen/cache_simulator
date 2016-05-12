/**
 * The http server - A express app that runs on node.js
 */

'use strict';

import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from './../../node_modules/react-dom/server'
import cacheSimulatorApp from './../client/reducers'
import config from './config/'
import logger from './util/logger'
import { match, RouterContext } from 'react-router'
import createRoutes from './../routes/index';
import { createMemoryHistory, useQueries } from 'history';

const server = express()
const port = 3000

logger.info('configuring express....');
config(server, express);
logger.info('express configured');

// This is fired every time the server side receives a request
server.use(handleRender)

/**
 * Function that handles server-side rendering with react-router.
 *
 * @param req http-request
 * @param res http-response
 */
function handleRender(req, res) {
  let history = useQueries(createMemoryHistory)();
  // Create a new Redux store instance
  let store = createStore(cacheSimulatorApp)
  let routes = createRoutes(history);
  //let location = history.createLocation(req.url);

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // Render the component to a string
      const html = renderToString(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      )
      // Grab the initial state from our Redux store
      const initialState = store.getState()
      // Send the rendered page back to the client
      res.render('index', { html, initialState});
    } else {
      res.status(404).send('Not found')
    }
  })
}
server.listen(port)
console.log('Server listening on port: ' + port)
