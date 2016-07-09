/**
 * Created by kim on 2016-06-13.
 */

jest.disableAutomock();

import cacheAndMemoryContent from '../../src/client/reducers/cacheAndMemoryContent.js'
import initialCacheContent from '../../src/client/reducers/model/initialCacheContent.js'
import initialMemoryContent from '../../src/client/reducers/model/initialMemoryContent.js'
import initialRegisterContent from '../../src/client/reducers/model/initialRegisterContent.js'
import Instruction from '../../src/client/reducers/model/Instruction.js'
import * as actions from '../../src/client/actions/'
import {Map, List} from 'immutable'

describe('cacheAndMemoryContent-reducer', () => {
  let action;
  let initialState;

  beforeEach(() => {
    action = actions.cacheAndMemoryContentInitialization({
        fields: {
          cacheSize: 8,
          blockSize: 4,
          associativity: 2,
          replacementAlgorithm: "LRU",
          memorySize: 16
        }
      }
    );
    initialState = Map(
      {
        memory: List(),
        cache: Map(),
        instructionHistory: List(),
        instructionResult: ""
      }
    )
  });

  it('should ignore undefined actions', () => {
    expect(cacheAndMemoryContent("state", {})).toBe("state")
  })

  it('should create cache and memory layout', () => {
    expect(cacheAndMemoryContent(initialState, action).get("cache")).not.toBe(undefined)
    expect(cacheAndMemoryContent(initialState, action).get("memory")).not.toBe(undefined)
    expect(cacheAndMemoryContent(initialState, action).get("instructionResult")).not.toBe(undefined)
  })

  it('should create a cache layout from the specified properties', () => {
    let cache = initialCacheContent(8, 4, 2, "LRU");
    expect(cache.get("cacheSize")).toBe(8)
    expect(cache.get("blockSize")).toBe(4)
    expect(cache.get("associativity")).toBe(2)
    expect(cache.get("blockCount")).toBe(1)
    expect(cache.get("tagBits")).toBe(29)
    expect(cache.get("replacementAlgorithm")).toBe("LRU")
    expect(cache.get("offsetBits")).toBe(2)
    expect(cache.get("indexBits")).toBe(1)
    expect(cache.get("sets").size).toBe(2)
    expect(cache.get("sets").get(0).get("rows").size).toBe(1)
    expect(cache.get("sets").get(0).get("rows").get(0).get("id")).toBe("row_id00")
    expect(cache.get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x0")
    expect(cache.get("sets").get(0).get("rows").get(0).get("index")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("validbit")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").size).toBe(4)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("id")).toBe("element_id000")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("byte")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("address")).toBe("0x0")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe("0x0")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(false)
  })

  it('should create a memory layout from the specified properties', () => {
    let memory = initialMemoryContent(16);
    expect(memory.size).toBe(16)
    expect(memory.get(0).get("address_string")).toBe("0x0")
    expect(memory.get(0).get("address_number")).toBe(0)
    expect(memory.get(0).get("data_string")).not.toBe(undefined)
    expect(memory.get(0).get("data_number")).not.toBe(undefined)
  })

  it('should simulate a instruction', () => {

    let state = Map({
      cache: initialCacheContent(4096, 32, 1, "LRU"),
      memory: initialMemoryContent(100000),
      register: initialRegisterContent(),
      instructionHistory: List(),
      instructionResult: "",
      simulating: false
    });
    /*
     * Testing the following assembly
     *
     * LOAD 12 C
     * LOAD 13 0
     * LOAD 9 1C
     * LOAD 6 8
     * STORE 6 18
     * LOAD 14 80
     * STORE 14 0
     * LOAD 11 100
     * LOAD 10 18
     *
     */

    let assembly =
      [
        { operationType: "LOAD", register: 12, address: "C"},
        { operationType: "LOAD", register: 13, address: "0"},
        { operationType: "LOAD", register: 9, address: "1C"},
        { operationType: "LOAD", register: 6, address: "8"},
        { operationType: "STORE", register: 6, address: "18"},
        { operationType: "LOAD", register: 14, address: "80"},
        { operationType: "STORE", register: 14, address: "0"},
        { operationType: "LOAD", register: 11, address: "100"},
        { operationType: "LOAD", register: 10, address: "18"}
      ]
    let result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(9);
    expect(result.get("instructionResult")).toBe("HIT!");
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(4).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(8).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x0")
    expect(result.get("cache").get("sets").get(0).get("rows").get(4).get("tag")).toBe("0x80")
    expect(result.get("cache").get("sets").get(0).get("rows").get(8).get("tag")).toBe("0x100")
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result.get("cache").get("sets").get(0).get("rows").get(4).get("miss")).toBe(false)
    expect(result.get("cache").get("sets").get(0).get("rows").get(8).get("miss")).toBe(false)
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(24).get("hit")).toBe(true)
    expect(result.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(0).get("address")).toBe("0xC")
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(0).get("register")).toBe(12)
    expect(result.get("instructionHistory").get(1).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(1).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(1).get("register")).toBe(13)
    expect(result.get("instructionHistory").get(2).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(2).get("address")).toBe("0x1C")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(2).get("register")).toBe(9)
    expect(result.get("instructionHistory").get(3).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(3).get("address")).toBe("0x8")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(3).get("register")).toBe(6)
    expect(result.get("instructionHistory").get(4).get("operationType")).toBe("STORE")
    expect(result.get("instructionHistory").get(4).get("address")).toBe("0x18")
    expect(result.get("instructionHistory").get(4).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(4).get("register")).toBe(6)
    expect(result.get("instructionHistory").get(5).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(5).get("address")).toBe("0x80")
    expect(result.get("instructionHistory").get(5).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(5).get("register")).toBe(14)
    expect(result.get("instructionHistory").get(6).get("operationType")).toBe("STORE")
    expect(result.get("instructionHistory").get(6).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(6).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(6).get("register")).toBe(14)
    expect(result.get("instructionHistory").get(7).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(7).get("address")).toBe("0x100")
    expect(result.get("instructionHistory").get(7).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(7).get("register")).toBe(11)
    expect(result.get("instructionHistory").get(8).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(8).get("address")).toBe("0x18")
    expect(result.get("instructionHistory").get(8).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(8).get("register")).toBe(10)


    state = Map({
      cache: initialCacheContent(64, 16, 1, "LRU"),
      memory: initialMemoryContent(1024),
      register: initialRegisterContent(),
      instructionHistory: List(),
      instructionResult: "",
      simulating: false
    });
    /*
     * Testing the following assembly
     *
     * LOAD 12 C
     * LOAD 13 3C
     * LOAD 9 30
     * STORE 16 C
     * STORE 9 4
     * LOAD 11 40
     * LOAD 10 0
     */

    assembly =
      [
        { operationType: "LOAD", register: 12, address: "C"},
        { operationType: "LOAD", register: 13, address: "3C"},
        { operationType: "LOAD", register: 9, address: "30"},
        { operationType: "STORE", register: 16, address: "C"},
        { operationType: "STORE", register: 9, address: "4"},
        { operationType: "LOAD", register: 11, address: "40"},
        { operationType: "LOAD", register: 10, address: "0"},
      ]
    result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(7);
    expect(result.get("instructionResult")).toBe("MISS! Cache updated");
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x0")
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("tag")).toBe("0x30")
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(true)
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("miss")).toBe(false)
    expect(result.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(0).get("address")).toBe("0xC")
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(0).get("register")).toBe(12)
    expect(result.get("instructionHistory").get(1).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(1).get("address")).toBe("0x3C")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(1).get("register")).toBe(13)
    expect(result.get("instructionHistory").get(2).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(2).get("address")).toBe("0x30")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(2).get("register")).toBe(9)
    expect(result.get("instructionHistory").get(3).get("operationType")).toBe("STORE")
    expect(result.get("instructionHistory").get(3).get("address")).toBe("0xC")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(3).get("register")).toBe(16)
    expect(result.get("instructionHistory").get(4).get("operationType")).toBe("STORE")
    expect(result.get("instructionHistory").get(4).get("address")).toBe("0x4")
    expect(result.get("instructionHistory").get(4).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(4).get("register")).toBe(9)
    expect(result.get("instructionHistory").get(5).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(5).get("address")).toBe("0x40")
    expect(result.get("instructionHistory").get(5).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(5).get("register")).toBe(11)
    expect(result.get("instructionHistory").get(6).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(6).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(6).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(6).get("register")).toBe(10)

    /*
     * Testing the following assembly
     *
     * LOAD 12 0
     * LOAD 13 3C
     * LOAD 9 30
     * STORE 16 10
     * STORE 9 0
     * LOAD 11 40
     * LOAD 10 0
     */

    assembly =
      [
        { operationType: "LOAD", register: 12, address: "0"},
        { operationType: "LOAD", register: 13, address: "3C"},
        { operationType: "LOAD", register: 9, address: "30"},
        { operationType: "LOAD", register: 16, address: "10"},
        { operationType: "STORE", register: 9, address: "0"},
        { operationType: "LOAD", register: 11, address: "40"},
        { operationType: "LOAD", register: 10, address: "0"},
      ]
    result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(7);
    expect(result.get("instructionResult")).toBe("MISS! Cache updated");
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(1).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("validbit")).toBe(1)
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x0")
    expect(result.get("cache").get("sets").get(0).get("rows").get(1).get("tag")).toBe("0x10")
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("tag")).toBe("0x30")
    expect(result.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(true)
    expect(result.get("cache").get("sets").get(0).get("rows").get(1).get("miss")).toBe(false)
    expect(result.get("cache").get("sets").get(0).get("rows").get(3).get("miss")).toBe(false)
    expect(result.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(0).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(0).get("register")).toBe(12)
    expect(result.get("instructionHistory").get(1).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(1).get("address")).toBe("0x3C")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(1).get("register")).toBe(13)
    expect(result.get("instructionHistory").get(2).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(2).get("address")).toBe("0x30")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(2).get("register")).toBe(9)
    expect(result.get("instructionHistory").get(3).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(3).get("address")).toBe("0x10")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(3).get("register")).toBe(16)
    expect(result.get("instructionHistory").get(4).get("operationType")).toBe("STORE")
    expect(result.get("instructionHistory").get(4).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(4).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(4).get("register")).toBe(9)
    expect(result.get("instructionHistory").get(5).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(5).get("address")).toBe("0x40")
    expect(result.get("instructionHistory").get(5).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(5).get("register")).toBe(11)
    expect(result.get("instructionHistory").get(6).get("operationType")).toBe("LOAD")
    expect(result.get("instructionHistory").get(6).get("address")).toBe("0x0")
    expect(result.get("instructionHistory").get(6).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(6).get("register")).toBe(10)

    /*
     * Testing the LRU algorithm
     */

    state = Map({
      cache: initialCacheContent(16, 8, 2, "LRU"),
      memory: initialMemoryContent(1024),
      register: initialRegisterContent(),
      instructionHistory: List(),
      instructionResult: "",
      simulating: false
    });

    assembly =
      [
        { operationType: "LOAD", register: 0, address: "0"},
        { operationType: "LOAD", register: 0, address: "8"},
        { operationType: "LOAD", register: 0, address: "16"},
        { operationType: "LOAD", register: 0, address: "0"},
      ]
    result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(4);
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("MISS")

    assembly =
      [
        { operationType: "LOAD", register: 0, address: "0"},
        { operationType: "LOAD", register: 0, address: "8"},
        { operationType: "LOAD", register: 0, address: "0"},
        { operationType: "LOAD", register: 0, address: "16"},
        { operationType: "LOAD", register: 0, address: "0"},
      ]
    result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(5);
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(4).get("result")).toBe("HIT")

    /*
     * Testing the FIFO algorithm
     */

    state = Map({
      cache: initialCacheContent(16, 8, 2, "FIFO"),
      memory: initialMemoryContent(1024),
      register: initialRegisterContent(),
      instructionHistory: List(),
      instructionResult: "",
      simulating: false
    });

    assembly =
      [
        { operationType: "LOAD", register: 0, address: "0"},
        { operationType: "LOAD", register: 0, address: "8"},
        { operationType: "LOAD", register: 0, address: "0"},
        { operationType: "LOAD", register: 0, address: "10"},
        { operationType: "LOAD", register: 0, address: "0"}
      ]
    result = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), instruction.operationType, instruction.register).simulate();
    }, state)

    expect(result.get("instructionHistory").size).toBe(5);
    expect(result.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(1).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(2).get("result")).toBe("HIT")
    expect(result.get("instructionHistory").get(3).get("result")).toBe("MISS")
    expect(result.get("instructionHistory").get(4).get("result")).toBe("MISS")

  })

})

