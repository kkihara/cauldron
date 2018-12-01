// @flow

import { SET_PAGETYPE_PDF } from '../actions';
import type { T_PdfPath, T_PdfPathsById } from '../types';

type Action = {
  type: string,
  ...T_PdfPath
}

const pdfPathsById = (
  state: T_PdfPathsById = {},
  action: Action
) => {
  switch (action.type) {
    case SET_PAGETYPE_PDF:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          path: action.path
        }
      };
    default:
      return state;
  }
}

export default pdfPathsById;
