// @flow

import uuid from 'uuid';

/*
 * Types
 */
export const NEW_PAGE = 'NEW_PAGE';
export const LOAD_PDF = 'LOAD_PDF';
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

export const loadPdf = (path: string) => ({
  type: LOAD_PDF,
  path
})

export const newHighlight = (position: any) => ({
  type: NEW_HIGHLIGHT,
  id: uuid.v4(),
  position
})
