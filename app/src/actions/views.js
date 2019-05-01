// @flow

import {
  HOME_VIEW,
  ARXIV_VIEW
} from './';

export const viewHome = () => ({
  type: HOME_VIEW,
});

export const viewArxiv = () => ({
  type: ARXIV_VIEW,
});
