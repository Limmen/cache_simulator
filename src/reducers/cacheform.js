/**
 * Created by kim on 2016-05-06.
 */
'use strict';
import { CACHE_FORM_SUBMIT } from '../constants/ActionTypes'

export default function cacheform(state = {}, action) {
  switch (action.type) {
    case  CACHE_FORM_SUBMIT:
      return action.fields
    default:
      return state
  }
}
