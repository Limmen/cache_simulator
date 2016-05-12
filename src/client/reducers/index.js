/**
 * Rootreducer that combine the app's reducers.
 *
 * Created by kim on 2016-05-05.
 */
'use strict';
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux'
import cacheform from './cacheform'
import fetchform from './fetchform'

const rootReducer = combineReducers({
  cacheform,
  fetchform,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
