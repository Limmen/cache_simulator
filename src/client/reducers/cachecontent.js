/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_CONTENT_INIT } from '../constants/ActionTypes'
import initialCacheContent from './initialCacheContent'

export default function cachecontent(state = {}, action) {
  switch (action.type) {
    case  CACHE_CONTENT_INIT:
      return initialCacheContent(action.fields.cacheSize, action.fields.blockSize, action.fields.associativity)
    default:
      return state
  }
}

