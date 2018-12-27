// @flow

import { combineReducers } from 'redux';
import pageList from './pageList';
import currentPage from './currentPage';

export default combineReducers({
  pageList,
  currentPage,
});
