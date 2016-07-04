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
    expect(cache.get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x00")
    expect(cache.get("sets").get(0).get("rows").get(0).get("index")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("validbit")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").size).toBe(4)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("id")).toBe("element_id000")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("byte")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("address")).toBe("0x00")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe("0x00")
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
      cache: initialCacheContent(8, 4, 2, "LRU"),
      memory: initialMemoryContent(16),
      register: initialRegisterContent(),
      instructionHistory: List(),
      instructionResult: "",
      simulating: false
    });
    /*
     * Testing the following assembly
     *
     * LOAD 0 0
     * LOAD 0 0
     * LOAD 0 10
     *
     */
    let result1 = new Instruction(state, 0, "LOAD", 0).simulate();
    expect(result1.get("instructionHistory").size).toBe(1);
    expect(result1.get("instructionResult")).toBe("MISS! Cache updated");
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(true)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(false)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x0")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("MISS")
    let result2 = new Instruction(result1, 0, "LOAD", 0).simulate();
    expect(result2.get("instructionHistory").size).toBe(2);
    expect(result2.get("instructionResult")).toBe("HIT!");
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(true)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result2.get("instructionHistory").get(1).get("operationType")).toBe("LOAD")
    expect(result2.get("instructionHistory").get(1).get("address")).toBe("0x0")
    expect(result2.get("instructionHistory").get(1).get("result")).toBe("HIT")
    let result3 = new Instruction(result2, parseInt("10", 16), "LOAD", 0).simulate();
    expect(result3.get("instructionHistory").size).toBe(3);
    expect(result3.get("instructionResult")).toBe("MISS! Address not found in Main Memory");
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(false)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result3.get("instructionHistory").get(2).get("operationType")).toBe("LOAD")
    expect(result3.get("instructionHistory").get(2).get("address")).toBe("0x10")
    expect(result3.get("instructionHistory").get(2).get("result")).toBe("MISS")


    state = Map({
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
    result1 = assembly.reduce((acc, instruction) => {
      return new Instruction(acc, parseInt(instruction.address, 16), "LOAD", instruction.register).simulate();
    }, state)
/*
    expect(result1.get("instructionHistory").size).toBe(9);
    expect(result1.get("instructionResult")).toBe("HIT!");
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(4).get("validbit")).toBe(1)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(8).get("validbit")).toBe(1)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("tag")).toBe("0x0")
    expect(result1.get("cache").get("sets").get(0).get("rows").get(4).get("tag")).toBe("0x80")
    expect(result1.get("cache").get("sets").get(0).get("rows").get(8).get("tag")).toBe("0x100")
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(4).get("miss")).toBe(false)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(8).get("miss")).toBe(false)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(24).get("hit")).toBe(true)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0xC")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x0")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x1C")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x8")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("STORE")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x18")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x80")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("STORE")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x0")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x100")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x18")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("HIT")
    */
  })
})
