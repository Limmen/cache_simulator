/**
 * Created by kim on 2016-05-05.
 */

import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState)
  return store
}
