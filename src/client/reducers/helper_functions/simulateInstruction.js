/**
 * Exports a function to simulate a instruction in the cache.
 *
 * Created by kim on 2016-05-27.
 */

import {Map, List} from 'immutable'

/**
 * Function that simulates a instruction in the cache.
 *
 * @param state state
 * @param address address entered by the user
 * @param operationType operationType entered by the user
 * @returns {*} new state1
 */
export default function simulateInstruction(state, address, operationType) {
  let tag = getTag(address, state.get("cache").get("blockSize"))
  state = clear(state)
  let index = getRowIndex(tag, state.get('cache').get('blockCount'), state.get('cache').get('offsetBits'), state.get('cache').get('indexBits'));
  let setNr = getSetNr(state, index, tag);
  let row = state.get('cache').get('sets').get(setNr).get('rows').get(index);

  if (hit(row, tag)) {
    let newRow = row.set('elements', row.get('elements').map((e) => {
      if ((Number(e.get("byte"))) === (Number(address) - Number(tag))) {
        return e.set("hit", true);
      } else
        return e
    })).set("usedDate", Date.now())
    state = updateInstructionHistory(row, tag, operationType, state).set("instructionResult", "HIT!");
    return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, () => newRow)))))
  }
  else {
    if (memoryHit(tag, state.get('memory'))) {
      let data = getBlock(state.get('cache').get('blockSize'), tag, state.get('memory'))
      let newRow = row.set('elements', row.get('elements').map((e) => {
        return e.set('data', data[e.get('byte')]).set("address", "0x" + (Number(tag) + Number(e.get('byte'))))
      })).set("validbit", 1).set("tag", "0x" + tag).set("miss", true).set("loadedDate", Date.now());
      state = updateInstructionHistory(row, tag, operationType, state).set("instructionResult", "MISS! Cache updated");
      return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, () => newRow)))))
    } else {
      state = updateInstructionHistory(row, tag, operationType, state);
      return state.set("instructionResult", "MISS! Address not found in Main Memory");
    }
  }
}


/**
 * Function that clears state for visual effects.
 *
 * @param state state to be updated
 * @returns {*} new state
 */
function clear(state) {
  let newState = state.set("cache", state.get("cache").set("sets", state.get("cache").get("sets").map((s) => s.set("rows", s.get("rows").map((r) => r.set("elements", r.get("elements").map((e) => e.set("hit", false))).set("miss", false))))))
  return newState;
}

/**
 * Function that calculates setNumber to be affected by the cache hit/miss
 *
 * @param state state
 * @param index row-index
 * @param tag tag of the block
 * @returns {number} set-number
 */
function getSetNr(state, index, tag) {
  let rows = List();
  let algorithm = state.get('cache').get('replacementAlgorithm')
  let row;
  for (let i = 0; i < state.get("cache").get("sets").size; i++) {
    row = state.get("cache").get("sets").get(i).get("rows").get(index)
    if (hit(row, tag)) {
      return i;
    }
    rows = rows.push(row);
  }
  for (let i = 0; i < rows.size; i++) {
    if (rows.get(i).get("validbit") === 0) {
      return i;
    }
  }
  switch (algorithm) {
    case "LRU":
      return lru(rows);
    case "FIFO":
      return fifo(rows);
    case "RANDOM":
      return random(rows);
  }
}

/**
 * Simulates the LRU replacement algorithm
 *
 * @param rows rows with the same index from different sets
 * @returns {number} set-number
 */
function lru(rows) {
  let setNr = 0;
  let usedDate = rows.get(0).get("usedDate");

  for (let i = 1; i < rows.size; i++) {
    if (rows.get(i).get("usedDate") < usedDate) {
      setNr = i;
      usedDate = rows.get(i).get("usedDate");
    }
  }
  return setNr;
}

/**
 * Simulates  the FIFO replacement algorithm
 *
 * @param rows rows with the same index from different sets
 * @returns {number}set-number
 */
function fifo(rows) {
  let setNr = 0;
  let loadedDate = rows.get(0).get("loadedDate");

  for (let i = 1; i < rows.size; i++) {
    if (rows.get(i).get("loadedDate") < loadedDate) {
      setNr = i;
      loadedDate = rows.get(i).get("usedDate");
    }
  }
  return setNr;
}

/**
 * Simulates the RANDOM replacement algorithm
 *
 * @param rows rows with the same index from different sets
 * @returns {number} set-number
 */
function random(rows) {
  return Math.floor((Math.random() * rows.size));
}

/**
 * Returns row-index in the cache
 *
 * @param tag tag of the block to be fetched
 * @param blockCount number of blocks in each set
 * @param offsetBits number of offsetbits in the address
 * @param indexBits number of indexbits in the address
 * @returns {*} row-index
 */
function getRowIndex(tag, blockCount, offsetBits, indexBits) {
  if (blockCount === 1)
    return 0;
  let binary = createBinaryString(Number(tag))
  let index = binary.slice(32 - (offsetBits + indexBits), 32 - offsetBits)
  return parseInt(index, 2);
}

/**
 * Returns the tag of the block (a whole block is always fetched on cache miss)
 *
 * @param tag tag of the instruction
 * @param blockSize blocksize
 * @returns {number} tag of the block
 */
function getTag(tag, blockSize) {
  return Number(tag) - Number((Number(tag) % Number(blockSize)));
}

/**
 * Fetches a block of data
 *
 * @param blockSize block-size in the cache memory
 * @param tag address-tag to be fetched
 * @param memory main memory
 * @returns {Array} block of data
 */
function getBlock(blockSize, tag, memory) {
  let data = [];
  for (let i = 0; i < blockSize; i++) {
    data.push(getData(Number(tag) + Number(i), memory))
  }
  return data;
}

/**
 * Fetches the data from the specified main memory address
 *
 * @param tag address-tag
 * @param memory main memory
 * @returns {string} data
 */
function getData(tag, memory) {
  let data = "empty"
  memory.map(function (addr) {
    if (Number(addr.get('address_number')) === Number(tag)) {
      data = addr.get('data_string');
      return;
    }
  })
  return data;
}

/**
 * Function that updates instructionhistory
 *
 * @param row row in the cache affected by the instruction simulation
 * @param tag tag of the instruction
 * @param operationType operation-type of the instruction
 * @param state state to update
 * @returns {*} new state with updated instructionHistory
 */
function updateInstructionHistory(row, tag, operationType, state) {
  let result;
  if (hit(row, tag)) {
    result = "HIT";
  }
  else {
    result = "MISS"
  }
  let instruction = Map(
    {
      operationType: operationType,
      address: "0x" + tag,
      result: result
    })
  return state.set('instructionHistory', state.get('instructionHistory').push(instruction));
}

/**
 * Checks wheter the instruction was a hit in the cache or not.
 *
 * @param row row calculated by replacementalgorithm and index-bits
 * @param tag address-tag of the instruction
 * @returns {boolean}
 */
function hit(row, tag) {
  if (row.get("validbit") === 1) {
    if (row.get("tag") === "0x" + tag)
      return true;
    else
      return false;
  }
  else {
    return false;
  }
}

/**
 * Checks if the address to be fetched is valid, i.e it can be found in the main memory
 *
 * @param tag address-tag
 * @param memory main memory
 * @returns {boolean}
 */
function memoryHit(tag, memory) {
  if (getData(tag, memory) !== "empty")
    return true;
  else
    return false;
}

/**
 * Creates binary string from integer
 *
 * @param nMask integer
 * @returns {string} binary string
 */
function createBinaryString(nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}
