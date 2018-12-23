// @flow

import { NEW_PAGE, UPDATE_TITLE, SET_PAGETYPE_PDF } from '../actions';
import { pageTypes } from '../types';
import type { T_Page, T_PagesById } from '../types';

const pagesById = (
  state: T_PagesById = {},
  action: any
) => {
  switch (action.type) {
    case NEW_PAGE:
      return {
        ...state,
        [action.id]: {
          pageType: action.pageType,
          created: action.created,
          title: '',
          tags: [],
          highlights: null
        }
      };
    case UPDATE_TITLE:
      const page = state[action.id];
      return {
        ...state,
        [action.id]: {
          ...page,
          title: action.title
        }
      };
    case SET_PAGETYPE_PDF:
      if (!state[action.id]) throw new Error('Page does not exist: ' + action.id);
      if (state[action.id].pageType != pageTypes.none) {
        throw new Error('Page already set: ' + action.id);
      }
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          pageType: action.pageType
        }
      };
    default:
      return state;
  }
};

export default pagesById;
