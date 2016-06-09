/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_AND_MEMORY_CONTENT_INIT, CACHE_CONTENT_UPDATE, LINK_CLICKED } from '../constants/ActionTypes'
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
    case LINK_CLICKED:
      return clear(state);
    default:
      return state
  }
}

function clear(state) {
  return state.set("cache", state.get("cache").set("sets", state.get("cache").get("sets").map((s) => s.set("rows", s.get("rows").map((r) => r.set("elements", r.get("elements").map((e) => e.set("hit", false))))))))
}

