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
} from '../actions';
import type { T_Page } from '../types'

type State = {
  isLoading: bool,
  pageList: Array<T_Page>,
}

const pageList = (
  state: State = { isLoading: false, pageList: [] },
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
        pageList: state.pageList.map<T_Page>(page => {
          if (page.id == action.id) {
            page.title = action.title;
          }
          return page;
        })
      };
    default:
      return state;
  }
};

export default pageList;
