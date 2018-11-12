// @flow

import { combineReducers } from 'redux';
import pages from './pages';
import highlights from './highlights';
import pdfDocument from './pdfDocument';

export default combineReducers({
  pages,
  highlights,
  pdfDocument
});
