/**
 * Cache and Memory reducer
 *
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_AND_MEMORY_CONTENT_INIT, CACHE_CONTENT_UPDATE, LINK_CLICKED,
  START_SIMULATION, STOP_SIMULATION} from '../constants/ActionTypes'
import initialCacheContent from './helper_functions/initialCacheContent'
import initialMemoryContent from './helper_functions/initialMemoryContent'
import initialRegisterContent from './helper_functions/initialRegisterContent'
import simulateInstruction from './helper_functions/simulateInstruction'
import {Map, List} from 'immutable'

/**
 * Initialstate
 */
const initialState = Map(
  {
    memory: List(),
    cache: Map(),
    register: Map(),
    instructionHistory: List(),
    instructionResult: "",
    instruction: "",
    simulating: false
  }
)

/**
 * Takes an action and a given state and returns a new state
 *
 * @param state old state
 * @param action action
 * @returns {*} new state
 */
export default function cacheAndMemoryContent(state = initialState, action) {
  switch (action.type) {
    case  CACHE_AND_MEMORY_CONTENT_INIT:
      let newcache = initialCacheContent(action.fields.cacheSize, action.fields.blockSize, action.fields.associativity, action.fields.replacementAlgorithm)
      let newmemory = initialMemoryContent(action.fields.memorySize)
      let newregister = initialRegisterContent()
      return state.set('cache', newcache).set('memory', newmemory).set("register", newregister);
    case CACHE_CONTENT_UPDATE:
      if (state.get("simulating"))
        return simulateInstruction(state,parseInt(action.fields.fetchAddress,16), action.fields.operationType, action.fields.register)
      else
        return state;
    case LINK_CLICKED:
      return clear(state);
    case START_SIMULATION:
      return state.set("simulating", true)
    case STOP_SIMULATION:
      return clear(state)
    default:
      return state
  }
}

/**
 * Function that clears state for visual effects.
 *
 * @param state
 * @returns {*} updated state
 */
function clear(state) {
  let newState = state.set("cache", state.get("cache").set("sets", state.get("cache").get("sets").map((s) => s.set("rows", s.get("rows").map((r) => r.set("elements", r.get("elements").map((e) => e.set("hit", false)))))))).set("simulating", false).set("instructionResult", "").set("instruction", "")
  return newState.set("cache", state.get("cache").set("sets", newState.get("cache").get("sets").map((s) => s.set("rows", s.get("rows").map((r) => r.set("miss", false))))))
}
