/**
 * Test for the fetchform reducer.
 *
 * Created by kim on 2016-05-11.
 */

jest.unmock('../../src/client/reducers/fetchform.js');
jest.unmock('../../src/client/actions/');

import fetchform from '../../src/client/reducers/fetchform.js'
import * as actions from '../../src/client/actions/'

describe('fetchform-reducer', () => {
  let action;

  beforeEach(() => {
    action = actions.fetchFormSubmit({
        fields:
        {
          field1: "field1",
          field2: "field2",
          field3: "field3"
        }
      }
    )
  });

  it('should handle FETCH_FORM_SUBMIT action', () => {
    expect(fetchform({}, action)).toBe(action.fields)
  })

  it('should ignore undefined actions', () => {
    expect(fetchform("state", {})).toBe("state")
  })

})
