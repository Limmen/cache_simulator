/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { CACHE_CONTENT_INIT } from '../constants/ActionTypes'

const initialState =
{
  content: []
}

export default function cachecontent(state = {}, action) {
  switch (action.type) {
    case  CACHE_CONTENT_INIT:
      return initialContent(action.fields.cacheSize, action.fields.blockSize, action.fields.associativity)
    default:
      return state
  }
}


function initialContent(cacheSize, blockSize, associativity) {

  let state =
  {
    content: []
  }

    for (let i = 0; i < associativity; i++) {
      let table = {rows: []}
      state.content.push(table)
      for (let j = 0; j < (cacheSize/associativity) / blockSize; j++) {
        let row = {elements: []}
        table.rows.push(row)
        for (let k = 0; k < blockSize; k++) {
         let element =
         {
           id: "id" + i + j + k,
           set: i,
           index: j,
           byte: k,
           data: 'empty',
           address: 'empty',
           validbit: 'N'
         }
          row.elements.push(element)
        }
      }
    }
  return state;
}
