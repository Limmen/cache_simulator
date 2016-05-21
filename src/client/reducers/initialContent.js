/**
 * Created by kim on 2016-05-21.
 */

export default function initialContent(cacheSize, blockSize, associativity) {
  let blockCount = (cacheSize / associativity) / blockSize;

  let state =
  {
    cacheSize: cacheSize,
    blockSize: blockSize,
    associativity: associativity,
    blockCount: blockCount,
    sets: []
  }

  for (let i = 0; i < associativity; i++) {
    let table =
    {
      set: i,
      rows: [],
      nr_elements: blockSize
    }
    state.sets.push(table)
    for (let j = 0; j < (cacheSize / associativity) / blockSize; j++) {
      let row =
      {
        id: "row_id" + i + j,
        tag: "empty",
        validbit: "N",
        elements: []
      }
      table.rows.push(row)
      for (let k = 0; k < blockSize; k++) {
        let element =
        {
          id: "element_id" + i + j + k,
          index: j,
          byte: k,
          data: 'empty'
        }
        row.elements.push(element)
      }
    }
  }
  return state;
}
