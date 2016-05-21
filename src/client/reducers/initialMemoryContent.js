/**
 * Created by kim on 2016-05-21.
 */

export default function initialMemoryContent(memorySize) {

  let state =
  {
    memory: []
  };

  for(let i = 0; i < memorySize; i++){
    state.memory.push(
      {
        address: "0x" + i.toString(16),
        data: "0x" + Number(getRandomArbitrary(0, 256)).toString(16)
      }
    )
  }
  return state;
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
