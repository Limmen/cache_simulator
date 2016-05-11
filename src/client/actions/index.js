/**
 * Created by kim on 2016-05-05.
 */
import * as types from '../constants/ActionTypes'

export function cacheFormSubmit(fields) {
  return {
    type: types.CACHE_FORM_SUBMIT,
    fields
  }
}

export function fetchFormSubmit(fields) {
  return {
    type: types.FETCH_FORM_SUBMIT,
    fields
  }
}


