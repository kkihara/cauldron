// @flow

import uuid from 'uuid';
import pdfjs from 'pdfjs-dist/webpack';
import { pageTypes, progressTypes } from '../types';
import type { T_PageTypes } from '../types';

/*
 * Action Types
 */
export const NEW_PAGE = 'NEW_PAGE';
export const SET_PDF_PAGE = 'SET_PDF_PAGE';
export const RECEIVE_PDF = 'RECEIVE_PDF';
export const UPDATE_HIGHLIGHT = 'ADD_HIGHLIGHT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

/*
 * Creators
 */
export const newPage = (title: string) => ({
  type: NEW_PAGE,
  id: uuid.v4(),
  pageType: pageTypes.none,
  created: Date.now(),
  title
});

export const setPdfPage = (id: string, path: string) => ({
  type: SET_PDF_PAGE,
  id,
  path
});

const _setCurrentPage = (id: string, progress: string, pageType: string, contents: any = {}) => ({
  type: SET_CURRENT_PAGE,
  id,
  progress,
  pageType,
  contents
});

export const setCurrentPage = (id: string) => (
  function(dispatch: any, getState: any) {
    const state = getState();
    const page = state.pagesById[id];

    if (page.pageType == pageTypes.pdf) {
      // TODO: convert this to DB query to get encoded pdf
      const path = state.pdfPathsById[id];
      dispatch(_setCurrentPage(id, progressTypes.loading, pageTypes.pdf));
      dispatch(loadPdf(path));
    } else {
      if (page.pageType != pageTypes.none) {
        throw new Error('Unrecognized page type: ' + page.pageType);
      }
    }
  }
);

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

export const updatePdfHighlight = (id: string, encoded: string) => ({
  type: UPDATE_HIGHLIGHT,
  id,
  encoded
});
