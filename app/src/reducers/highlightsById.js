// @flow

import { UPDATE_HIGHLIGHT } from '../actions';
import type { T_Highlight, T_HighlightsById } from '../types';

type Action = {
  type: string,
  ...T_Highlight
}

const highlightsById = (
    state: T_HighlightsById = {},
    action: Action) => {

  switch(action.type) {
    case UPDATE_HIGHLIGHT:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          encoded: action.encoded
        }
      };
    default:
      return state;
  }
};

export default highlightsById;
