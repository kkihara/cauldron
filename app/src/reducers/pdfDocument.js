// @flow

import { RECEIVE_PDF } from '../actions';

type Action = {
  type: string,
  pdfDocument: string
}

const pdfDocument = (
    state: any = null,
    action: Action) => {

  switch (action.type) {
    case RECEIVE_PDF:
      return action.pdfDocument;
    default:
      return state;
  };
};

export default pdfDocument;
