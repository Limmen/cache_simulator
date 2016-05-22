/**
 * ActionCreator, returns action objects of different types.
 *
 * Created by kim on 2016-05-05.
 */
import * as types from '../constants/ActionTypes'



export function cacheAndMemoryContentInitialization(fields) {
  return {
    type: types.CACHE_AND_MEMORY_CONTENT_INIT,
    fields
  }
}

export function cacheContentUpdate(fields) {
  return {
    type: types.CACHE_CONTENT_UPDATE,
    fields
  }
}

