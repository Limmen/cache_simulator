/**
 * Test for the action-creator.
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/actions/');
import * as actions from '../../src/client/actions/'
import * as types from '../../src/client/constants/ActionTypes'

describe('actions', () => {
  describe('cache and memory initialization', () => {
    it('should create an action to initialize the cache', () => {
      const fields = {fields: {field1: "field1", field2: "field2", field3: "field3", field4: "field4"}}
      const expectedAction = {
        type: types.CACHE_AND_MEMORY_CONTENT_INIT,
        fields
      }
      expect(actions.cacheAndMemoryContentInitialization(fields)).toEqual(expectedAction)
    })
  })

  describe('cache content update', () => {
    it('should create an action to update the cache', () => {
      const fields = {fields: {field1: "field1", field2: "field2", field3: "field3"}}
      const expectedAction = {
        type: types.CACHE_CONTENT_UPDATE,
        fields
      }
      expect(actions.cacheContentUpdate(fields)).toEqual(expectedAction)
    })
  })
})
