/**
 * Created by kim on 2016-05-20.
 */

'use strict';
import { MEMORY_CONTENT_INIT } from '../constants/ActionTypes'
import initialMemoryContent from './initialMemoryContent'

const initialState =
{
  memory: []
}

export default function memorycontent(state = initialState, action) {
  switch (action.type) {
    case  MEMORY_CONTENT_INIT:
      return initialMemoryContent(action.fields.memorySize)
    default:
      return state
  }
}

