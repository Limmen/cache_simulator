/**
 * The entrypoint for the client-side react app. Renders the application to the DOM.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'
import configureStore from './store/configureStore'
import createRoutes from './../routes/index';

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState)
// Render the main component into the dom
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    {createRoutes(history)}
  </Provider>,
  document.getElementById('app')
)

