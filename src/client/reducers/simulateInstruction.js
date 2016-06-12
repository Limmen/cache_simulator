/**
 * Created by kim on 2016-05-27.
 */

import {Map, List} from 'immutable'

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
      ;
      return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, () => newRow)))))
    } else {
      state = updateInstructionHistory(row, tag, operationType, state);
      return state.set("instructionResult", "MISS! Address not found in Main Memory");
    }
  }
}

function clear(state) {
  let newState = state.set("cache", state.get("cache").set("sets", state.get("cache").get("sets").map((s) => s.set("rows", s.get("rows").map((r) => r.set("elements", r.get("elements").map((e) => e.set("hit", false))).set("miss", false))))))
  return newState;
}

function getSetNr(state, index, tag) {
  let rows = List();
  let algorithm = state.get('cache').get('replacementAlgorithm')
  let row;
  for (let i = 0; i < state.get("cache").get("sets").size; i++) {
    row = state.get("cache").get("sets").get(i).get("rows").get(index)
    if (hit(row, tag)) {
      console.log("hit  setnr: " + i);
      return i;
    }
    rows = rows.push(row);
  }
  for (let i = 0; i < rows.size; i++) {
    if (rows.get(i).get("validbit") === 0) {
      console.log("validbit setnr: " + i);
      return i;
    }
  }
  switch (algorithm) {
    case "LRU":
      return LRU(rows);
    case "FIFO":
      return FIFO(rows);
    case "RANDOM":
      return RANDOM(rows);
  }
}

function LRU(rows) {
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

function FIFO(rows) {
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

function RANDOM(rows) {
  return Math.floor((Math.random() * rows.size));
}

function getRowIndex(tag, blockCount, offsetBits, indexBits) {
  if (blockCount === 1)
    return 0;
  let binary = createBinaryString(Number(tag))
  let index = binary.slice(32 - (offsetBits + indexBits), 32 - offsetBits)
  return parseInt(index, 2);
}

function getTag(tag, blockSize) {
  return Number(tag) - Number((Number(tag) % Number(blockSize)));
}
function getBlock(blockSize, tag, memory) {
  let data = [];
  for (let i = 0; i < blockSize; i++) {
    data.push(getData(Number(tag) + Number(i), memory))
  }
  return data;
}

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

function memoryHit(tag, memory) {
  if (getData(tag, memory) !== "empty")
    return true;
  else
    return false;
}

function createBinaryString(nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}
