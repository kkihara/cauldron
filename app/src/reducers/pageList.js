// @flow

import {
  REQUEST_NEW_PAGE,
  RECEIVE_NEW_PAGE,
  REQUEST_DELETE_PAGE,
  RECEIVE_DELETE_PAGE,
  REQUEST_FETCH_ALL_PAGES,
  RECEIVE_FETCH_ALL_PAGES,
  REQUEST_PUT_TITLE,
  RECEIVE_PUT_TITLE,
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  SEARCH_PAGE,
  SEARCH_TAGS,
  APPEND_TAG_SEARCH,
} from '../actions';
import type { T_Page } from '../types';

type State = {
  isLoading: bool,
  pageList: Array<T_Page>,
  query: string,
  tagQuery: Array<object>,
}

const pageList = (
  state: State = { isLoading: false, pageList: [], query: '', tagQuery: [] },
  action: any
): State => {
  switch (action.type) {
    case REQUEST_FETCH_ALL_PAGES:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVE_FETCH_ALL_PAGES:
      return {
        ...state,
        isLoading: false,
        pageList: action.pageList,
      };
    case RECEIVE_NEW_PAGE:
      const page: T_Page = action.page;
      return {
        ...state,
        pageList: state.pageList.concat([page]),
      };
    case RECEIVE_DELETE_PAGE:
      return {
        ...state,
        pageList: state.pageList.filter(page => {
          return page.id != action.id;
        })
      };
    case RECEIVE_PUT_TITLE:
      return {
        ...state,
        pageList: state.pageList.map(page => {
          if (page.id == action.id) {
            page.title = action.title;
          }
          return page;
        }),
      };
    case RECEIVE_ADD_TAG:
      return {
        ...state,
        pageList: state.pageList.map(page => {
          if (page.id == action.id) {
            page.tags = [...new Set(page.tags.concat(action.tag))];
          }
          return page;
        }),
      }
    case RECEIVE_DELETE_TAG:
      return {
        ...state,
        pageList: state.pageList.map(page => {
          if (page.id == action.id) {
            page.tags = page.tags.filter(tag => {
              return tag != action.tag;
            });
          }
          return page;
        }),
      }
    case SEARCH_PAGE:
      return {
        ...state,
        query: action.query,
      }
    case SEARCH_TAGS:
      return {
        ...state,
        tagQuery: action.query,
      }
    case APPEND_TAG_SEARCH:
      const newQuery = state.tagQuery
        ? state.tagQuery.concat({ label: action.query, value: action.query })
        : [{ label: action.query, value: action.query }];
      return {
        ...state,
        tagQuery: newQuery,
      }
    default:
      return state;
  }
};

export default pageList;
