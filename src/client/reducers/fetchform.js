/**
 * Created by kim on 2016-05-06.
 */
'use strict';
import { FETCH_FORM_SUBMIT } from '../constants/ActionTypes'

export default function fetchform(state = {fields: {}}, action) {
  switch (action.type) {
    case  FETCH_FORM_SUBMIT:
      return action.fields
    default:
      return state
  }
}
