// @flow

import { combineReducers } from 'redux';
import pages from './pages';
import highlights from './highlights';

export default combineReducers({
  pages,
  highlights
});
