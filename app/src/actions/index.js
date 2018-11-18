// @flow

import uuid from 'uuid';
import pdfjs from 'pdfjs-dist/webpack';
import type { T_HighlightNode } from '../types';

/*
 * Action Types
 */
export const NEW_PAGE = 'NEW_PAGE';
export const RECEIVE_PDF = 'RECEIVE_PDF';
export const NEW_HIGHLIGHT = 'ADD_HIGHLIGHT';

/*
 * Creators
 */
export const newPage = (title: string) => ({
  type: NEW_PAGE,
  id: uuid.v4(),
  created: Date.now(),
  title
});

export const receivePdf = (pdfDocument: any) => {
  return {
  type: RECEIVE_PDF,
  pdfDocument
  }
};

export const loadPdf = (path: string) => (
  function(dispatch: any) {
    pdfjs.getDocument(path)
      .then(pdfDocument => dispatch(receivePdf(pdfDocument)))
      .catch(() => console.log('ERROR READING PDF: ' + path))
  }
);

export const newHighlight = (startNode: T_HighlightNode, endNode: T_HighlightNode) => ({
  type: NEW_HIGHLIGHT,
  id: uuid.v4(),
  startNode,
  endNode
});
