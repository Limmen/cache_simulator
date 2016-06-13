/**
 * Exports a function that returns a inital memory layout from a given memory size
 *
 * Created by kim on 2016-05-21.
 */

import {Map, List} from 'immutable'

/**
 * Function that creates a initial memory layout
 *
 * @param memorySize size of the memory
 * @returns {*} memory layout
 */
export default function initialMemoryContent(memorySize) {

  let memory = List()

  for (let i = 0; i < memorySize; i++) {
    let data = getRandomArbitrary(0, 256);
    let newMemory = memory.push(Map(
      {
        address_string: "0x" + i.toString(16),
        address_number: i,
        data_string: "0x" + Number(data).toString(16),
        data_number: data
      }
    ))
    memory = newMemory;
  }
  return memory;
}

/**
 * Returns a number between min (inclusive and max (exclusive)
 *
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
