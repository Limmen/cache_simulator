/**
 * Created by kim on 2016-05-05.
 */

import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, promise, logger)
  )
  return store
}
