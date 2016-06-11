/**
 * Created by kim on 2016-05-27.
 */

import {Map} from 'immutable'

export default function simulateInstruction(state, address, operationType) {
  let tag = getTag(address, state.get("cache").get("blockSize"))
  state = clear(state)
  let index = getRowIndex(tag, state.get('cache').get('cacheSize'), state.get('cache').get('offsetBits'), state.get('cache').get('indexBits'));
  let setNr = getSetNr(index, state.get('cache').get('replacementAlgorithm'));
  let row = state.get('cache').get('sets').get(setNr).get('rows').get(index);

  if (hit(row, tag)) {
    let newRow = row.set('elements', row.get('elements').map((e) => {
      if ((Number(e.get("byte"))) === (Number(address) - Number(tag))) {
        return e.set("hit", true);
      } else
        return e
    }))
    state = updateInstructionHistory(row, tag, operationType, state).set("instructionResult", "HIT!");
    return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, () => newRow)))))
  }
  else {
    if (memoryHit(tag, state.get('memory'))) {
      let data = getBlock(state.get('cache').get('blockSize'), tag, state.get('memory'))
      let newRow = row.set('elements', row.get('elements').map((e) => {
        return e.set('data', data[e.get('byte')])
      })).set("validbit", 1).set("tag", "0x" + tag).set("miss", true);
      state = updateInstructionHistory(row, tag, operationType, state).set("instructionResult", "MISS! Cache updated");;
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

function getSetNr(index, algorithm) {
  return 0;
}

function getRowIndex(tag, cacheSize, offsetBits, indexBits) {
  let binary = createBinaryString(Number(tag))
  let index = binary.slice(32-(offsetBits + indexBits),32-offsetBits)
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

function createBinaryString (nMask) {
  // nMask must be between -2147483648 and 2147483647
  for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
       nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
  return sMask;
}
