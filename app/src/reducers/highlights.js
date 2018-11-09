// @flow

import { NEW_HIGHLIGHT } from '../actions';

type Action = {
  type: string,
  id: string,
  position: any
}

const highlights = (
    state: Array<any> = [],
    action: Action) => {

  switch(action.type) {
    case NEW_HIGHLIGHT:
      return [
        ...state,
        {
          id: action.id,
          position: action.position,
          content: {},
          comment: 'comment'
        }
      ];
    default:
      return state;
  }
};

export default highlights;
