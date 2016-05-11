/**
 * Created by kim on 2016-05-05.
 */
import * as types from '../constants/ActionTypes'

export function increment() {
  return {
    type: types.INCREMENT
  }
}

export function cacheFormSubmit() {
  return {
    type: types.CACHE_FORM_SUBMIT,
    fields
  }
}

export function fetchFormSubmit() {
  return {
    type: types.FETCH_FORM_SUBMIT,
    fields
  }
}


