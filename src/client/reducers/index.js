/**
 * Rootreducer that combine the app's reducers.
 *
 * Created by kim on 2016-05-05.
 */
'use strict';
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux'
import cacheAndMemoryContent from './cacheAndMemoryContent'

const rootReducer = combineReducers({
  cacheAndMemoryContent,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
