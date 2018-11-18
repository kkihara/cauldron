// @flow

import { NEW_HIGHLIGHT } from '../actions';
import type { T_Highlight } from '../types';

type Action = {
  type: string,
  ...T_Highlight
}

const highlights = (
    state: Array<T_Highlight> = [],
    action: Action) => {

  switch(action.type) {
    case NEW_HIGHLIGHT:
      return [
        ...state,
        {
          id: action.id,
          startNode: action.startNode,
          endNode: action.endNode
        }
      ];
    default:
      return state;
  }
};

export default highlights;
