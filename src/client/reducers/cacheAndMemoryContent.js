/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_AND_MEMORY_CONTENT_INIT, CACHE_CONTENT_UPDATE } from '../constants/ActionTypes'
import initialCacheContent from './initialCacheContent'
import initialMemoryContent from './initialMemoryContent'
import {Map, List} from 'immutable'

const initialState = Map(
  {
    memory: List(),
    cache: Map(),
  }
)
export default function cacheAndMemoryContent(state = initialState, action) {
  switch (action.type) {
    case  CACHE_AND_MEMORY_CONTENT_INIT:
      let newcache = initialCacheContent(action.fields.cacheSize, action.fields.blockSize, action.fields.associativity, action.fields.replacementAlgorithm)
      let newmemory = initialMemoryContent(action.fields.memorySize)
      let newState = state.set('cache', newcache).set('memory', newmemory);
      return newState;
    case CACHE_CONTENT_UPDATE:
      return simulateInstruction(state, action.fields.fetchAddress, action.fields.operationType)
    default:
      return state
  }
}

function simulateInstruction (state, address, operationType){
  let index = getRowIndex(address, state.get('cache').get('cacheSize'));
  //let newData = getData(address, memory);
  let data = [];
  for (let i = 0; i < state.get('cache').get('blockSize'); i++) {
    data.push(getData(Number(address) + Number(i), state.get('memory')))
  }
  let setNr = 0;
  console.log("Set: " + JSON.stringify(state.get('cache').get('sets').get(setNr)))
  console.log("INDEX: " + index)
  let row = state.get('cache').get('sets').get(setNr).get('rows').get(index);
  console.log("ROW: " + JSON.stringify(state.get('cache').get('sets').get(setNr).get('rows').get(index)))
  console.log("MAP res: " + JSON.stringify(row.get('elements').map((e) => e.set('data', data[e.get('byte')]))))
  let newRow = row.set('elements', row.get('elements').map((e) => e.set('data', data[e.get('byte')])))
  console.log("new Row: " + JSON.stringify(newRow))
  return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, (r) => newRow)))))
}


function getRowIndex(address, cacheSize){
  return Number((Number(address) % Number(cacheSize)) - 1);
}

function getData(address, memory) {
  let data = "empty"
  memory.map(function (addr) {
    if (Number(addr.get('address_number')) === Number(address)) {
      console.log("MATCH" + " " + addr.data_number);
      data = addr.get('address_number');
      return;
    }
  })
  return data;
}
