import {
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  REQUEST_FETCH_ALL_TAGS,
  RECEIVE_FETCH_ALL_TAGS,
  RECEIVE_NEW_PAGE,
  RECEIVE_DELETE_PAGE,
} from '../actions';
import type { T_Tag } from '../types';

type State = {
  [id: number]: Array<T_Tag>
};

const tagList = (
  state: State = {},
  action: any,
): State => {
  switch (action.type) {
    case RECEIVE_ADD_TAG:
      let addTagList = state[action.pageId];
      if (!addTagList) {
        console.log('Could not find tagList for pageId: ' + action.pageId);
        return state;
      }
      addTagList = addTagList.slice();
      addTagList.push(action.tag);
      return {
        ...state,
        [action.pageId]: addTagList,
      };
    case RECEIVE_DELETE_TAG:
      let delTagList = state[action.pageId];
      if (!delTagList) {
        console.log('Could not find tagList for pageId: ' + action.pageId);
        return state;
      }
      return {
        ...state,
        [action.pageId]: delTagList.filter(tag => tag.id != action.tagId),
      };
    case RECEIVE_FETCH_ALL_TAGS:
      return {
        ...action.allTags,
      }
    case RECEIVE_NEW_PAGE:
      return {
        ...state,
        [action.page.id]: [],
      }
    case RECEIVE_DELETE_PAGE:
      let { [action.id]: omit, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default tagList;
