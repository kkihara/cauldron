// @flow

import uuid from 'uuid';

/*
 * Types
 */
export const NEW_PAGE = 'NEW_PAGE';

/*
 * Creators
 */
export const newPage = (title: string) => ({
  type: NEW_PAGE,
  id: uuid.v4(),
  created: Date.now(),
  title
});
