// @flow

import { combineReducers } from 'redux';
import pagesById from './pagesById';
import pdfPathsById from './pdfPathsById';
import currentPage from './currentPage';
import highlightsById from './highlightsById';

export default combineReducers({
  pagesById,
  pdfPathsById,
  currentPage,
  highlightsById
});
