/**
 * Instruction class that contains method and state to simulate a instruction given a cache-memory, main memory and registers.
 *
 * Created by kim on 2016-07-04.
 */

import {Map, List} from 'immutable'

class Instruction {
  /**
   * Class constructor to initialize instruction state.
   *
   * @param state application state that contians cache-memory, main memory, registers, instruction history and more.
   * @param address address of the instruction
   * @param operationType operation-type of the instruction
   * @param register register of the instruction
   */
  constructor(state, address, operationType, register) {
    this.state = this.clear(state);
    this.address = address;
    this.operationType = operationType;
    this.register = register;
    this.tag = this.getTag(this.state.get("cache").get("blockSize"))
    this.index = this.getRowIndex(this.state.get('cache').get('blockCount'), this.state.get('cache').get('offsetBits'), this.state.get('cache').get('indexBits'));
    this.setNr = this.getSetNr();
    this.row = this.state.get('cache').get('sets').get(this.setNr).get('rows').get(this.index);
  }

  /**
   * Entry point for simulating the instruction, returns updated application state.
   *
   * @returns {state}
   */
  simulate() {
    if (this.hit(this.row)) {
      return this.simulateHit();
    } else {
      return this.simulateMiss();
    }
  }

  /**
   * Method that contians simulation logic that happens when the instruction was a hit in the cache memory
   * @returns {state}
   */
  simulateHit() {
    let newRow = this.getNewRowHit();
    this.state = this.updateInstructionHistory().set("instructionResult", "HIT!").set("instruction", this.operationType + " " + this.register + " 0x" + this.address.toString(16).toUpperCase());
    if (this.operationType === "STORE") {
      this.state = this.storeHit();
      let data = this.getBlock(this.state.get('cache').get('blockSize'), this.state.get('memory'))
      newRow = newRow.set('elements', newRow.get('elements').map((e) => {
        return e.set('data', data[e.get('byte')]).set("address", "0x" + (Number(this.tag) + Number(e.get('byte'))).toString(16).toUpperCase())
      })).set("validbit", 1).set("tag", "0x" + this.tag.toString(16).toUpperCase()).set("loadedDate", Date.now());
    }
    if (this.operationType === "LOAD") {
      this.state = this.loadHit();
    }
    return this.state.set('cache', this.state.get('cache').set('sets', this.state.get('cache').get('sets').update(this.setNr, (s) => s.set('rows', s.get('rows').update(this.index, () => newRow)))))
  }

  /**
   * Method that contians simulation logic that happens when the instruction was a miss in the cache memory
   * @returns {state}
   */
  simulateMiss() {
    if (this.operationType === "STORE") {
      this.state = this.storeMiss();
    }
    if (this.memoryHit(this.state.get('memory'))) {
      return this.memoryFetch();
    } else {
      this.state = this.updateInstructionHistory();
      return this.state.set("instructionResult", "MISS! Address not found in Main Memory").set("instruction", this.operationType + " " + this.register + " 0x" + this.address.toString(16).toUpperCase());
    }
  }

  /**
   * Method that contians simulation logic that happens when a STORE-instruction was a miss in the cache memory
   * @returns {state}
   */
  storeMiss() {
    let storeData = this.state.get("register").get("registers").get(this.register).get("data");
    let bytes = this.wordToBytes(storeData);
    return this.state.set("memory", this.storeWord(bytes, this.state.get("memory")))
  }

  /**
   * Method that contians simulation logic that happens when a STORE-instruction was a hit in the cache memory
   * @returns {state}
   */
  storeHit() {
    let storeData = this.state.get("register").get("registers").get(this.register).get("data");
    let bytes = this.wordToBytes(storeData);
    return this.state.set("memory", this.storeWord(bytes, this.state.get("memory")))
  }

  /**
   * Method that contians simulation logic that happens when a LOAD-instruction was a miss in the cache memory
   * @returns {state}
   */
  loadMiss() {
    let word = this.bytesToWord(this.getWord(this.address, this.state.get("memory")));
    return this.state.set("register", this.state.get("register").set("registers", this.state.get("register").get("registers").update(this.register, (reg) => reg.set("data", word))))
  }

  /**
   * Method that contians simulation logic that happens when a LOAD-instruction was a hit in the cache memory
   * @returns {state}
   */
  loadHit() {
    let data = this.getWord(this.address, this.state.get('memory'))
    let word = this.bytesToWord(data);
    return this.state.set("register", this.state.get("register").set("registers", this.state.get("register").get("registers").update(this.register, (reg) => reg.set("data", word))))
  }

  /**
   * Method for fetching new data from main memory to the cache
   * @returns {state}
   */
  memoryFetch() {
    let newRow = this.getNewRowMiss();
    if (this.operationType === "LOAD") {
      this.state = this.loadMiss();
    }
    this.state = this.updateInstructionHistory().set("instructionResult", "MISS! Cache updated").set("instruction", this.operationType + " " + this.register + " 0x" + this.address.toString(16).toUpperCase());
    return this.state.set('cache', this.state.get('cache').set('sets', this.state.get('cache').get('sets').update(this.setNr, (s) => s.set('rows', s.get('rows').update(this.index, () => newRow)))))
  }

  /**
   * Method that returns the updated cache-row after a miss-instruction
   * @returns {cache-row}
   */
  getNewRowMiss() {
    let data = this.getBlock(this.state.get('cache').get('blockSize'), this.state.get('memory'))
    return this.row.set('elements', this.row.get('elements').map((e) => {
      return e.set('data', data[e.get('byte')]).set("address", "0x" + (Number(this.tag) + Number(e.get('byte'))).toString(16).toUpperCase())
    })).set("validbit", 1).set("tag", "0x" + this.tag.toString(16).toUpperCase()).set("miss", true).set("loadedDate", Date.now());
  }

  /**
   * Method that returns the updated cache-row after a hit-instruction
   * @returns {cache-row}
   */
  getNewRowHit() {
    return this.row.set('elements', this.row.get('elements').map((e) => {
      if ((Number(e.get("byte"))) === (Number(this.address) - Number(this.tag))) {
        return e.set("hit", true);
      } else
        return e
    })).set("usedDate", Date.now())
  }

  /**
   * Function that clears state for visual effects.
   *
   * @param state state to be updated
   * @returns {*} new state
   */
  clear(state) {
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
  getSetNr() {
    let rows = List();
    let algorithm = this.state.get('cache').get('replacementAlgorithm')
    let row;
    for (let i = 0; i < this.state.get("cache").get("sets").size; i++) {
      row = this.state.get("cache").get("sets").get(i).get("rows").get(this.index)
      if (this.hit(row)) {
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
        return this.lru(rows);
      case "FIFO":
        return this.fifo(rows);
      case "RANDOM":
        return this.random(rows);
    }
  }

  /**
   * Simulates the LRU replacement algorithm
   *
   * @param rows rows with the same index from different sets
   * @returns {number} set-number
   */
  lru(rows) {
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
  fifo(rows) {
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
  random(rows) {
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
  getRowIndex(blockCount, offsetBits, indexBits) {
    if (blockCount === 1)
      return 0;
    let binary = this.createBinaryString(Number(this.tag))
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
  getTag(blockSize) {
    return Number(this.address) - Number((Number(this.address) % Number(blockSize)));
  }

  /**
   * Fetches a block of data
   *
   * @param blockSize block-size in the cache memory
   * @param tag address-tag to be fetched
   * @param memory main memory
   * @returns {Array} block of data
   */
  getBlock(blockSize, memory) {
    let data = [];
    for (let i = 0; i < blockSize; i++) {
      data.push(this.getData(Number(this.tag) + Number(i), memory))
    }
    return data;
  }

  getWord(address, memory) {
    let data = [];
    for (let i = 0; i < 4; i++) {
      data.push(this.getData(Number(address) + Number(i), memory))
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
  getData(tag, memory) {
    let data = "invalid_address"
    memory.map(function (addr) {
      if (Number(addr.get('address_number')) === Number(tag)) {
        data = addr.get('data_string');
        return;
      }
    })
    return data;
  }

  /**
   * Stores a word in main memory at the specified tag
   *
   * @param bytes 4 bytes to store
   * @param tag memory address to store at
   * @param memory memory to store in
   * @returns {*} updated memory
   */
  storeWord(bytes, memory) {
    let newMemory;
    for (let i = 0; i < bytes.length; i++) {
      newMemory = this.storeByte(bytes[i], Number(this.tag) + i, memory);
      memory = newMemory;
    }
    return memory;
  }

  /**
   * Stores a byte in memory at the specified tag
   *
   * @param byte byte to store
   * @param tag memory address to store at
   * @param memory memory to store in
   * @returns {*} updated memory
   */
  storeByte(byte, tag, memory) {
    return memory.update(Number(tag), (m) => {
      return m.set("data_string", "0x" + byte.toString(16).toUpperCase()).set("data_number", byte)
    })
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
  updateInstructionHistory() {
    let result;
    if (this.hit(this.row)) {
      result = "HIT";
    }
    else {
      result = "MISS"
    }
    let instruction = Map(
      {
        operationType: this.operationType,
        register: this.register,
        address: "0x" + this.address.toString(16).toUpperCase(),
        result: result
      })
    return this.state.set('instructionHistory', this.state.get('instructionHistory').push(instruction));
  }

  /**
   * Checks whether the instruction was a hit in the cache or not.
   *
   * @param row row calculated by replacementalgorithm and index-bits
   * @param tag address-tag of the instruction
   * @returns {boolean}
   */
  hit(row) {
    if (row.get("validbit") === 1) {
      if (row.get("tag") === "0x" + this.tag.toString(16).toUpperCase())
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
  memoryHit(memory) {
    if (this.getData(this.tag, memory) !== "invalid_address")
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
  createBinaryString(nMask) {
    // nMask must be between -2147483648 and 2147483647
    for (var nFlag = 0, nShifted = nMask, sMask = ""; nFlag < 32;
         nFlag++, sMask += String(nShifted >>> 31), nShifted <<= 1);
    return sMask;
  }

  /**
   * Function that converts 4 bytes in hex format to a word in hex format
   * @param data bytes to convert
   * @returns {string} hexadecimal string of the word
   */
  bytesToWord(data) {
    let byte1 = this.createBinaryString(parseInt(data[0].slice(2, data[0].length), 16)).slice(24, 32);
    let byte2 = this.createBinaryString(parseInt(data[1].slice(2, data[1].length), 16)).slice(24, 32);
    let byte3 = this.createBinaryString(parseInt(data[2].slice(2, data[2].length), 16)).slice(24, 32);
    let byte4 = this.createBinaryString(parseInt(data[3].slice(2, data[3].length), 16)).slice(24, 32);
    let word = byte1 + byte2 + byte3 + byte4
    return "0x" + parseInt(word, 2).toString(16).toUpperCase();
  }

  /**
   * Function that converts a hexadecimal word to 4 bytes in decimal
   *
   * @param word word to convert
   * @returns {*} array of 4 bytes.
   */
  wordToBytes(word) {
    let binaryWord = this.createBinaryString(parseInt(word.slice(2, word.length), 16));
    let byte4 = binaryWord.slice(0, 8)
    let byte3 = binaryWord.slice(8, 16)
    let byte2 = binaryWord.slice(16, 24)
    let byte1 = binaryWord.slice(24, 32)
    let data = [parseInt(byte4, 2), parseInt(byte3, 2), parseInt(byte2, 2), parseInt(byte1, 2)]
    return data;
  }

}
export default Instruction
