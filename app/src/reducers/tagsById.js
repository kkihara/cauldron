// @flow

import { ADD_TAG, DELETE_TAG } from '../actions';
import type { T_TagsById } from '../types';

const tagsById = (
  state: T_TagsById = {},
  action: any
) => {
  switch (action.type) {
    case ADD_TAG:
      return {
        ...state,
        [action.id]: [...state[action.id], action.tag]
      }
    case DELETE_TAG:
      return {
        ...state,
        [action.id]: state[action.id].filter(tag => tag != action.tag)
      }
    default:
      return state;
  }
}

export default tagsById;
