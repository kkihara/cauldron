// @flow

import { combineReducers } from 'redux';
import pageList from './pageList';
import currentPage from './currentPage';
import tagList from './tagList';
import currentView from './currentView';

export default combineReducers({
  pageList,
  tagList,
  currentPage,
  currentView,
});
