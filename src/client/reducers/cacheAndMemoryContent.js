/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_AND_MEMORY_CONTENT_INIT, CACHE_CONTENT_UPDATE } from '../constants/ActionTypes'
import initialCacheContent from './initialCacheContent'
import initialMemoryContent from './initialMemoryContent'
import simulateInstruction from './simulateInstruction'
import {Map, List} from 'immutable'

const initialState = Map(
  {
    memory: List(),
    cache: Map(),
    instructionHistory: List()
  }
)
export default function cacheAndMemoryContent(state = initialState, action) {
  switch (action.type) {
    case  CACHE_AND_MEMORY_CONTENT_INIT:
      let newcache = initialCacheContent(action.fields.cacheSize, action.fields.blockSize, action.fields.associativity, action.fields.replacementAlgorithm)
      let newmemory = initialMemoryContent(action.fields.memorySize)
      return state.set('cache', newcache).set('memory', newmemory);
    case CACHE_CONTENT_UPDATE:
      return simulateInstruction(state, action.fields.fetchAddress, action.fields.operationType)
    default:
      return state
  }
}


