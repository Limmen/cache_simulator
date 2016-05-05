/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */

import expect from 'expect'
import counter from './../../src/reducers/counter.js'
import { INCREMENT } from './../../src/constants/ActionTypes'

describe('reducers', () => {
  describe('counter', () => {
    it('should provide the initial state', () => {
      expect(counter(undefined, {})).toBe(0)
    })

    it('should handle INCREMENT action', () => {
      expect(counter(1, { type: INCREMENT })).toBe(2)
    })

    it('should ignore unknown actions', () => {
      expect(counter(1, { type: undefined })).toBe(1)
    })
  })
})
