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
  SEARCH_PAGE,
} from '../actions';
import type { T_Page } from '../types';

type State = {
  isLoading: bool,
  pageList: Array<T_Page>,
  query: string,
}

const pageList = (
  state: State = { isLoading: false, pageList: [], query: '' },
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
        })
      };
    case SEARCH_PAGE:
      return {
        ...state,
        query: action.query,
      }
    default:
      return state;
  }
};

export default pageList;
