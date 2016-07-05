/**
 * ActionCreator, returns action objects of different types.
 *
 * Created by kim on 2016-05-05.
 */

import * as types from '../constants/ActionTypes'
import initialCacheContent from '../reducers/model/initialCacheContent'
import initialMemoryContent from '../reducers/model/initialMemoryContent'
import initialRegisterContent from '../reducers/model/initialRegisterContent'


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

export function startRendering(){
  return {
    type: types.START_RENDERING
  }
}

export function linkClicked() {
  return {
    type: types.LINK_CLICKED
  }
}

export function startSimulation() {
  return {
    type: types.START_SIMULATION
  }
}

export function stopSimulation() {
  return {
    type: types.STOP_SIMULATION
  }
}

export function clearCache() {
  return {
    type: types.CLEAR_CACHE
  }
}

