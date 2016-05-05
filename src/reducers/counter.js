/**
 * Created by kim on 2016-05-05.
 */

import { INCREMENT } from '../constants/ActionTypes'

export default function counter(state = 0, action) {
  switch (action.type) {
    case  INCREMENT:
      return state + 1
    default:
      return state
  }
}
