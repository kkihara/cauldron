// @flow

import { combineReducers } from 'redux';
import {
  REQUEST_PUT_TITLE,
  RECEIVE_PUT_TITLE,
  REQUEST_PUT_PAGETYPE,
  RECEIVE_PUT_PAGETYPE,
  REQUEST_UPLOAD_PDF,
  RECEIVE_UPLOAD_PDF,
  REQUEST_PUT_HIGHLIGHTS,
  RECEIVE_PUT_HIGHLIGHTS,
  REQUEST_FETCH_PAGE,
  RECEIVE_FETCH_PAGE,
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  REQUEST_FETCH_TAGS_BY_PAGE,
  RECEIVE_FETCH_TAGS_BY_PAGE,
} from '../actions';
import { pageTypes } from '../types';
import type { T_CurrentPage, T_Tag } from '../types';

type PageState = {
  ...T_CurrentPage,
  isLoading: bool,
};

const initialPageState: PageState = {
  isLoading: false,
  id: null,
  title: null,
  pageType: pageTypes.none,
  content: null,
};

const pageContents = (
  state: PageState = initialPageState,
  action: any
): PageState => {
  switch (action.type) {
    case RECEIVE_PUT_TITLE:
      if (action.id != state.id) return state;
      return {
        ...state,
        title: action.title,
      };
    case RECEIVE_PUT_PAGETYPE:
      if (action.id != state.id) return state;
      return {
        ...state,
        pageType: action.pageType,
      };
    case RECEIVE_UPLOAD_PDF:
      if (action.id != state.id) return state;
      return {
        ...state,
        isLoading: false,
        content: {
          pdf: action.content,
          highlights: '',  // TODO: should this be a different default?
        }
      };
    case RECEIVE_PUT_HIGHLIGHTS:
      if (action.id != state.id) return state;
      if (!state.content) {
        console.log('Error setting highlights on null content.');
        return state;
      }
      return {
        ...state,
        isLoading: false,
        content: {
          pdf: state.content.pdf,
          highlights: action.highlights,
        }
      };
    case REQUEST_FETCH_PAGE:
      if (action.id == state.id) return state;
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_FETCH_PAGE:
      if (action.id == state.id) return state;
      return {
        ...state,
        isLoading: false,
        id: action.id,
        title: action.title,
        pageType: action.pageType,
        content: action.content,
      };
    default:
      return state;
  }
};

type tagListState = {
  pageId: ?number,
  tagList: Array<T_Tag>,
};

const intialTagListState = {
  pageId: null,
  tagList: [],
};

const tagList = (
  state: tagListState = intialTagListState,
  action: any,
): tagListState => {
  switch (action.type) {
    case RECEIVE_ADD_TAG:
      if (action.pageId != state.pageId) return state;
      const tagList = state.tagList.slice();
      tagList.push(action.tag);
      return {
        ...state,
        tagList,
      };
    case RECEIVE_DELETE_TAG:
      if (action.pageId != state.pageId) return state;
      return {
        ...state,
        tagList: state.tagList.filter(
          tag => tag.id != action.tagId
        )
      };
    case RECEIVE_FETCH_TAGS_BY_PAGE:
      if (action.pageId == state.pageId) return state;
      return {
        pageId: action.pageId,
        tagList: action.tagList.slice(),
      };
    default:
      return state;
  }
};

export default combineReducers({
  pageContents,
  tagList,
});
