/**
 * ActionCreator, returns action objects of different types.
 *
 * Created by kim on 2016-05-05.
 */
import * as types from '../constants/ActionTypes'

/**
 * Creates the cacheform action.
 *
 * @param fields fields of the form
 * @returns {{type, fields: *}}
 */
export function cacheFormSubmit(fields) {
  return {
    type: types.CACHE_FORM_SUBMIT,
    fields
  }
}

/**
 * Creates the fetchform action.
 *
 * @param fields
 * @returns {{type, fields: *}}
 */
export function fetchFormSubmit(fields) {
  return {
    type: types.FETCH_FORM_SUBMIT,
    fields
  }
}


