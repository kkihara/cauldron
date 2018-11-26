// @flow

import { NEW_PAGE, SET_PDF_PAGE } from '../actions';
import { pageTypes } from '../types';
import type { T_Page, T_PagesById } from '../types';

// TODO: how to type this?
// type NewPageAction = {|
//   type: NEW_PAGE,
//   ...T_Page
// |};
//
// type SetPdfAction = {|
//   type: SET_PDF_PAGE,
//   id: string,
//   path: string
// |};
//
// type Action = NewPageAction | SetPdfAction;

const pagesById = (
  state: T_PagesById = {},
  action: any
) => {
  switch (action.type) {
    case NEW_PAGE:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          pageType: action.pageType,
          created: action.created,
          title: action.title
        }
      };
    case SET_PDF_PAGE:
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
