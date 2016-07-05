/**
 * Function to create and bootstrap the store with reducers, initialstate and middleware.
 *
 * Created by kim on 2016-05-05.
 */

import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

/**
 * Creates the store of the redux app.
 *
 * @param initialState initial state
 * @returns {*} the single store of the redux app
 */
export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promise, logger)
    //applyMiddleware(thunk, promise)
  )
  return store
}
