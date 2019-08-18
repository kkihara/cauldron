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
  TOGGLE_SORT,
  PUSH_SORT_COLUMN,
} from '../actions';
import type { T_Page } from '../types';

type State = {
  isLoading: bool,
  pageList: Array<T_Page>,
  query: string,
  tagQuery: Array<object>,
  columnCompare: { [column]: any },
  columnSort: Array<string>,
};

const lessThan = (a, b) => a < b ? -1 : (a > b ? 1 : 0);
const greaterThan = (a, b) => a < b ? 1 : (a > b ? -1 : 0);

const pageList = (
  state: State = {
    isLoading: false,
    pageList: [],
    query: '',
    tagQuery: [],
    columnCompare: { 'created': lessThan, 'title': lessThan },
    columnSort: [ 'created', 'title' ],
  },
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
      };
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
      };
    case SEARCH_PAGE:
      return {
        ...state,
        query: action.query,
      };
    case SEARCH_TAGS:
      return {
        ...state,
        tagQuery: action.query,
      };
    case APPEND_TAG_SEARCH:
      const newQuery = state.tagQuery
        ? state.tagQuery.concat({ label: action.query, value: action.query })
        : [{ label: action.query, value: action.query }];
      return {
        ...state,
        tagQuery: newQuery,
      };
    case TOGGLE_SORT:
      let newFunc = state.columnCompare[action.column] == lessThan ? greaterThan : lessThan;
      return {
        ...state,
        columnCompare: {
          ...state.columnCompare,
          [action.column]: newFunc,
        },
      };
    case PUSH_SORT_COLUMN:
      let newArr = state.columnSort.filter(x => x != action.column);
      newArr.unshift(action.column);
      return {
        ...state,
        columnSort: newArr,
      }
    default:
      return state;
  }
};

export default pageList;
