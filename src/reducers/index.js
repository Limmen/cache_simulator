/**
 * Created by kim on 2016-05-05.
 */
'use strict';
import { combineReducers } from 'redux'
import {reducer as formReducer} from 'redux-form';
import { routerReducer } from 'react-router-redux'
import counter from './counter'


const rootReducer = combineReducers({
  counter,
  form: formReducer,
  routing: routerReducer
})

export default rootReducer
