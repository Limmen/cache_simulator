/**
 * Created by kim on 2016-05-21.
 */

import {Map, List} from 'immutable'

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

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
