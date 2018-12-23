// @flow

import uuid from 'uuid';
import {
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  REQUEST_FETCH_TAGS_BY_PAGE,
  RECEIVE_FETCH_TAGS_BY_PAGE,
} from './';
import { tagDB } from '../utils/db';
import type { T_Tag } from '../types'

const requestAddTag = () => ({
  type: REQUEST_ADD_TAG,
});

const receiveAddTag = (tag: T_Tag) => ({
  type: RECEIVE_ADD_TAG,
  tag: tag,
});

export const addTag = (id: string, tag: string) => (
  (dispatch: any) => {
    dispatch(requestAddTag());

    tagDB.put({
      _id: uuid.v4(),
      pageId: id,
      value: tag,
    }).then(tag => {
      dispatch(receiveAddTag(tag));
    }).catch(err => {
      console.log(err);
    });
  }
);

const requestDeleteTag = () => ({
  type: REQUEST_DELETE_TAG,
});

const receiveDeleteTag = (tag) => ({
  type: RECEIVE_DELETE_TAG,
  tag: tag.id,
});

export const deleteTag = (id: string) => (
  (dispatch: any) => {
    dispatch(requestDeleteTag());

    tagDB.get(id).then(tag => {
      return tagDB.remove(tag);
    }).then(res => {
      return dispatch(receiveDeleteTag(res));
    }).catch(err => {
      console.log(err);
    });
  }
);

const requestFetchTagsByPage = () => ({
  type: REQUEST_FETCH_TAGS_BY_PAGE,
});

const receiveFetchTagsByPage = (tagList: Array<T_Tag>) => ({
  type: RECEIVE_FETCH_TAGS_BY_PAGE,
  tagList,
});

export const fetchTagsByPage = (pageId: string) => (
  (dispatch: any) => {
    dispatch(requestDeleteTag());

    tagDB.get(pageId).then(tag => {
      return tagDB.remove(tag);
    }).then(res => {
      return dispatch(receiveDeleteTag(res));
    }).catch(err => {
      console.log(err);
    });
  }
);
