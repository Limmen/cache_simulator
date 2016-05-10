/*eslint no-console:0 */

'use strict';

import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from './node_modules/react-dom/server'
import cacheSimulatorApp from './src/reducers'
import App from './src/containers/App'
import compression from 'compression';
require('node-jsx').install();


const server = Express()
const port = 3000


server.use(compression());
server.use(Express.static(path.join(__dirname, '/dist')));
server.set('views', path.join(__dirname, '/views'));
server.set('view engine', 'ejs');

// This is fired every time the server side receives a request
server.use(handleRender)

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = createStore(cacheSimulatorApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.render('index', { html, initialState});
}
server.listen(port)
console.log("Server listening on port: " + port)
