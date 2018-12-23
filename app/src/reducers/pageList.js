import {
  RECEIVE_NEW_PAGE,
  REQUEST_FETCH_ALL_PAGES,
  RECEIVE_FETCH_ALL_PAGES,
} from '../actions';
import type { T_Page } from '../types'

type State = {
  isLoading: bool,
  pageList: Array<T_Page>,
}

const pageList = (
  state: State = { isLoading: false, pageList: [] },
  action: any
) => {
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
      return {
        ...state,
        pageList: state.pageList.concat([action.page]),
      };
    default:
      return state;
  }
};

export default pageList;
