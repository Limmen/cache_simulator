/**
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/reducers/cacheform.js');
jest.unmock('../../src/client/actions/');

import cacheform from '../../src/client/reducers/cacheform.js'
import * as actions from '../../src/client/actions/'

describe('cacheform-reducer', () => {
  let action;

  beforeEach(() => {
    action = actions.cacheFormSubmit({
        fields:
        {
          field1: "field1",
          field2: "field2",
          field3: "field3"
        }
      }
    )
  });

  it('should handle CACHE_FORM_SUBMIT action', () => {
    expect(cacheform({}, action)).toBe(action.fields)
  })

  it('should ignore undefined actions', () => {
    expect(cacheform("state", {})).toBe("state")
  })
})
