/**
 * Reducer for the cache form.
 *
 * Created by kim on 2016-05-06.
 */
'use strict';
import { CACHE_FORM_SUBMIT } from '../constants/ActionTypes'

/**
 * Takes a state and an action and produces a new state. Will update the fields.
 *
 * @param state current state
 * @param action action that triggered the state change
 * @returns {*} new state
 */
export default function cacheform(state = {}, action) {
  switch (action.type) {
    case  CACHE_FORM_SUBMIT:
      return action.fields
    default:
      return state
  }
}
