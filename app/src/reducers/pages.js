// @flow

import { NEW_PAGE } from '../actions';
import type { T_PageSelector } from '../types';

type Action = {
  type: string,
  ...T_PageSelector
};

const pages = (
  state: Array<?T_PageSelector> = [],
  action: Action) => {

  switch (action.type) {
    case NEW_PAGE:
      return [
        ...state,
        {
          id: action.id,
          created: action.created,
          title: action.title
        }
      ]
    default:
      return state
  }
};

export default pages;
