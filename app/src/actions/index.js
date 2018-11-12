// @flow

import uuid from 'uuid';
import pdfjs from 'pdfjs-dist/webpack';

/*
 * Types
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
  console.log('RECEIVE PDF!');
  return {
  type: RECEIVE_PDF,
  pdfDocument
  }
};

export const loadPdf = (path: string) => (
  function(dispatch: any) {
    console.log('Loading PDF');
    pdfjs.getDocument(path)
      .then(pdfDocument => dispatch(receivePdf(pdfDocument)))
      .catch(() => console.log('ERROR READING PDF: ' + path))
  }
);

export const newHighlight = (position: any) => ({
  type: NEW_HIGHLIGHT,
  id: uuid.v4(),
  position
});
