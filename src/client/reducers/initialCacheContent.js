/**
 * Created by kim on 2016-05-21.
 */

import {Map, List} from 'immutable'

export default function initialCacheContent(cacheSize, blockSize, associativity, replacementAlgorithm) {
  let blockCount = (cacheSize / associativity) / blockSize;
  let indexBits = bitSize(blockCount - 1)
  let offsetBits = bitSize(blockSize - 1)
  let tagBits = 32 - (indexBits + offsetBits)
  let state = Map(
    {
      cacheSize: cacheSize,
      blockSize: blockSize,
      associativity: associativity,
      blockCount: blockCount,
      replacementAlgorithm: replacementAlgorithm,
      tagBits: tagBits,
      indexBits: indexBits,
      offsetBits: offsetBits,
      sets: List()
    });

  for (let i = 0; i < associativity; i++) {
    let table = Map(
      {
        set: i,
        rows: List(),
        nr_elements: blockSize
      })
    for (let j = 0; j < (cacheSize / associativity) / blockSize; j++) {
      let row = Map(
        {
          id: "row_id" + i + j,
          tag: "empty",
          index: j,
          validbit: 0,
          miss: false,
          elements: List()
        })
      for (let k = 0; k < blockSize; k++) {
        let element = Map(
          {
            id: "element_id" + i + j + k,
            byte: k,
            data: 'empty',
            hit: false
          })
        let newRow = row.set('elements', row.get('elements').push(element))
        row = newRow
      }
      let newTable = table.set('rows', table.get('rows').push(row))
      table = newTable
    }
    let newState = state.set('sets', state.get('sets').push(table))
    state = newState;
  }
  return state;
}

function bitSize(num) {
  return num.toString(2).length;
}
