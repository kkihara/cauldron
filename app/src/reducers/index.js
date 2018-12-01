// @flow

import { combineReducers } from 'redux';
import pagesById from './pagesById';
import tagsById from './tagsById';
import pdfPathsById from './pdfPathsById';
import currentPage from './currentPage';
import highlightsById from './highlightsById';

export default combineReducers({
  pagesById,
  tagsById,
  pdfPathsById,
  currentPage,
  highlightsById
});
