/**
 * Created by kim on 2016-06-13.
 */

jest.disableAutomock();

import cacheAndMemoryContent from '../../src/client/reducers/cacheAndMemoryContent.js'
import initialCacheContent from '../../src/client/reducers/helper_functions/initialCacheContent.js'
import initialMemoryContent from '../../src/client/reducers/helper_functions/initialMemoryContent.js'
import initialRegisterContent from '../../src/client/reducers/helper_functions/initialRegisterContent.js'
import simulateInstruction from '../../src/client/reducers/helper_functions/simulateInstruction.js'
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
    expect(cache.get("sets").get(0).get("rows").get(0).get("tag")).toBe("empty")
    expect(cache.get("sets").get(0).get("rows").get(0).get("index")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("validbit")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").size).toBe(4)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("id")).toBe("element_id000")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("byte")).toBe(0)
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("address")).toBe("empty")
    expect(cache.get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe("empty")
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
    let result1 = simulateInstruction(state, 0, "LOAD", 0);
    expect(result1.get("instructionHistory").size).toBe(1);
    expect(result1.get("instructionResult")).toBe("MISS! Cache updated");
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(true)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(false)
    expect(result1.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result1.get("instructionHistory").get(0).get("operationType")).toBe("LOAD")
    expect(result1.get("instructionHistory").get(0).get("address")).toBe("0x0")
    expect(result1.get("instructionHistory").get(0).get("result")).toBe("MISS")
    expect(result1.get("register").get(0)).not.toBe("empty")
    let result2 = simulateInstruction(result1, 0, "LOAD", 0);
    expect(result2.get("instructionHistory").size).toBe(2);
    expect(result2.get("instructionResult")).toBe("HIT!");
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(true)
    expect(result2.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result2.get("instructionHistory").get(1).get("operationType")).toBe("LOAD")
    expect(result2.get("instructionHistory").get(1).get("address")).toBe("0x0")
    expect(result2.get("instructionHistory").get(1).get("result")).toBe("HIT")
    expect(result1.get("register").get(0)).not.toBe("empty")
    let result3 = simulateInstruction(result2, 16, "LOAD", 0);
    expect(result3.get("instructionHistory").size).toBe(3);
    expect(result3.get("instructionResult")).toBe("MISS! Address not found in Main Memory");
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("validbit")).toBe(1)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("miss")).toBe(false)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("hit")).toBe(false)
    expect(result3.get("cache").get("sets").get(0).get("rows").get(0).get("elements").get(0).get("data")).toBe(state.get("memory").get(0).get("data_string"))
    expect(result3.get("instructionHistory").get(2).get("operationType")).toBe("LOAD")
    expect(result3.get("instructionHistory").get(2).get("address")).toBe("0x16")
    expect(result3.get("instructionHistory").get(2).get("result")).toBe("MISS")
    expect(result1.get("register").get(0)).not.toBe("empty")
  })

})
