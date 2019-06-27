// @flow

import { combineReducers } from 'redux';
import pageList from './pageList';
import currentPage from './currentPage';
import currentView from './currentView';

export default combineReducers({
  pageList,
  currentPage,
  currentView,
});
