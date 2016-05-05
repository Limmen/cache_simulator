/**
 * Created by kim on 2016-05-05.
 */

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'


const rootReducer = combineReducers({
  counter,
  routing: routerReducer
})

export default rootReducer
