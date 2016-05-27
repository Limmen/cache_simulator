/**
 * Created by kim on 2016-05-27.
 */

export default function simulateInstruction(state, address, operationType) {
  let index = getRowIndex(address, state.get('cache').get('cacheSize'));
  let data = getBlock(state.get('cache').get('blockSize'), address, state.get('memory'))
  let setNr = getSetNr(index, state.get('cache').get('replacementAlgorithm'));
  let row = state.get('cache').get('sets').get(setNr).get('rows').get(index);
  let newRow = row.set('elements', row.get('elements').map((e) => e.set('data', data[e.get('byte')])))
  return state.set('cache', state.get('cache').set('sets', state.get('cache').get('sets').update(setNr, (s) => s.set('rows', s.get('rows').update(index, (r) => newRow)))))
}

function getSetNr(index, algorithm) {
  return 0;
}

function getRowIndex(address, cacheSize) {
  return Number((Number(address) % Number(cacheSize)) - 1);
}

function getBlock(blockSize, address, memory) {
  let data = [];
  for (let i = 0; i < blockSize; i++) {
    data.push(getData(Number(address) + Number(i), memory))
  }
  return data;
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
