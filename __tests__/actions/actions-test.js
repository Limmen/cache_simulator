/**
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/actions/');
import * as actions from '../../src/client/actions/'
import * as types from '../../src/client/constants/ActionTypes'

describe('actions', () => {
  describe('cacheForm-submit action', () => {
    it('should create an action to submit cacheForm', () => {
      const fields = {fields: {field1: "field1", field2: "field2", field3: "field3"}}
      const expectedAction = {
        type: types.CACHE_FORM_SUBMIT,
        fields
      }
      expect(actions.cacheFormSubmit(fields)).toEqual(expectedAction)
    })
  })

  describe('fetchForm-submit action', () => {
    it('should create an action to submit fetchForm', () => {
      const fields = {fields: {field1: "field1", field2: "field2", field3: "field3"}}
      const expectedAction = {
        type: types.FETCH_FORM_SUBMIT,
        fields
      }
      expect(actions.fetchFormSubmit(fields)).toEqual(expectedAction)
    })
  })
})
