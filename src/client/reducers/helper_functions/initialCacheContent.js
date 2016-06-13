/**
 * Exports a function to create a initial cache memory layout from given properties
 *
 * Created by kim on 2016-05-21.
 */

import {Map, List} from 'immutable'

/**
 * Returns initial cache layout with the specified cacheSize, blockSize, associativity and replacementAlgorithm.
 *
 * @param cacheSize
 * @param blockSize
 * @param associativity
 * @param replacementAlgorithm
 * @returns {*} cache layout
 */
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
          loadedDate: -Infinity,
          usedDate: -Infinity,
          elements: List()
        })
      for (let k = 0; k < blockSize; k++) {
        let element = Map(
          {
            id: "element_id" + i + j + k,
            byte: k,
            address: 'empty',
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

/**
 * Returns bitsize of a integer
 *
 * @param num integer
 * @returns {*} bitsize
 */
function bitSize(num) {
  return num.toString(2).length;
}
