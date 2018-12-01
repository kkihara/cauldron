// @flow

import uuid from 'uuid';
import pdfjs from 'pdfjs-dist/webpack';
import { pageTypes, progressTypes } from '../types';
import type { T_PageTypes } from '../types';

/*
 * Action Types
 */
export const NEW_PAGE = 'NEW_PAGE';
export const SET_PAGETYPE_PDF = 'SET_PAGETYPE_PDF';
export const RECEIVE_PDF = 'RECEIVE_PDF';
export const UPDATE_HIGHLIGHT = 'ADD_HIGHLIGHT';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const ADD_TAG = 'ADD_TAG';
export const DELETE_TAG = 'DELETE_TAG';

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

export const addTag = (id: string, tag: string) => ({
  type: ADD_TAG,
  id,
  tag
});

export const deleteTag = (id: string, tag: string) => ({
  type: DELETE_TAG,
  id,
  tag
});

const _setPageTypePdf = (id: string, path: string) => ({
  type: SET_PAGETYPE_PDF,
  pageType: pageTypes.pdf,
  id,
  path
});

// TODO: split this action in 2?
export const setPageTypePdf = (id: string, path: string) => (
  (dispatch: any, getState: any) => {
    const state = getState();
    dispatch(_setPageTypePdf(id, path));

    if (state.currentPage.id == id) {
      dispatch(setCurrentPage(id));
    }
  }
);

const _setCurrentPage = (id: string, progress: string, pageType: string, contents: any = {}) => ({
  type: SET_CURRENT_PAGE,
  id,
  progress,
  pageType,
  contents
});

export const setCurrentPage = (id: string) => (
  (dispatch: any, getState: any) => {
    const state = getState();
    const page = state.pagesById[id];

    if (page.pageType == pageTypes.pdf) {
      // TODO: convert this to DB query to get encoded pdf
      const path = state.pdfPathsById[id].path;
      dispatch(_setCurrentPage(id, progressTypes.loading, pageTypes.pdf));
      return dispatch(loadPdf(path));
    } else {
      if (page.pageType != pageTypes.none) {
        throw new Error('Unrecognized page type: ' + page.pageType);
      }
      return dispatch(_setCurrentPage(id, progressTypes.done, pageTypes.none))
    }
  }
);

export const receivePdf = (pdfDocument: any) => ({
  type: RECEIVE_PDF,
  pdfDocument
});

export const loadPdf = (path: string) => (
  (dispatch: any) => (
    pdfjs.getDocument(path)
      .then(pdfDocument => dispatch(receivePdf(pdfDocument)))
      // .catch(() => console.log('ERROR READING PDF: ' + path))
  )
);

export const updatePdfHighlight = (id: string, encoded: string) => ({
  type: UPDATE_HIGHLIGHT,
  id,
  encoded
});
