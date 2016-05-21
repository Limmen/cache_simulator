/**
 * Rootreducer that combine the app's reducers.
 *
 * Created by kim on 2016-05-05.
 */
'use strict';
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux'
import fetchform from './fetchform'
import cachecontent from './cachecontent'
import memorycontent from './memorycontent'

const rootReducer = combineReducers({
  fetchform,
  cachecontent,
  memorycontent,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
