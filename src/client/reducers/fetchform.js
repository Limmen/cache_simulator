/**
 * Reducer for the fetch form.
 *
 * Created by kim on 2016-05-06.
 */
'use strict';
import { FETCH_FORM_SUBMIT } from '../constants/ActionTypes'

/**
 * Takes a state and an action and produces a new state. Will update the fetchform fields.
 *
 * @param state current state
 * @param action action that triggered the state update
 * @returns {*} new state
 */
export default function fetchform(state = {}, action) {
  switch (action.type) {
    case  FETCH_FORM_SUBMIT:
      return action.fields
    default:
      return state
  }
}
