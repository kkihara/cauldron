// @flow

import { SET_CURRENT_PAGE, RECEIVE_PDF } from '../actions';
import { pageTypes } from '../types';
import type { T_CurrentPage } from '../types';

// TODO: how to type this?
// type SetPageAction = {|
//   type: SET_CURRENT_PAGE,
//   ...T_CurrentPage
// |};
//
// type RcvPdfAction = {|
//   type: RECEIVE_PDF,
//   pdfDocument: string
// |};
//
// type Action = SetPageAction | RcvPdfAction;

const currentPage = (
  state: ?T_CurrentPage = null,
  action: any
) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return {
        id: action.id,
        progress: action.progress,
        pageType: action.pageType,
        contents: action.contents
      };
    case RECEIVE_PDF:
      if (!state) throw new Error('Cannot receive pdf on unset page.');
      if (state.pageType != pageTypes.pdf) {
        throw new Error('Cannot receive pdf on page type: ' + state.pageType);
      }

      return {
        ...state,
        contents: { pdfDocument: action.pdfDocument }
      };
    default:
      return state;
  }
};

export default currentPage;
