// @flow

import {
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
  REQUEST_FETCH_TAGS_BY_PAGE,
  RECEIVE_FETCH_TAGS_BY_PAGE,
} from './';
import * as db from '../utils/db';
import type { T_Tag } from '../types';

const requestAddTag = () => ({
  type: REQUEST_ADD_TAG,
});

const receiveAddTag = (pageId: number, tag: T_Tag) => ({
  type: RECEIVE_ADD_TAG,
  pageId,
  tag: tag,
});

export const addTag = (pageId: number, content: string) => (
  (dispatch: any) => {
    dispatch(requestAddTag());
    const tag = db.insertTag(pageId, content);
    return dispatch(receiveAddTag(pageId, tag));
  }
);

const requestDeleteTag = () => ({
  type: REQUEST_DELETE_TAG,
});

const receiveDeleteTag = (pageId: number, tagId: number) => ({
  type: RECEIVE_DELETE_TAG,
  pageId,
  tagId,
});

export const deleteTag = (pageId: number, tagId: number) => (
  (dispatch: any) => {
    dispatch(requestDeleteTag());
    db.deleteTag(pageId, tagId);
    return dispatch(receiveDeleteTag(pageId, tagId));
  }
);

const requestFetchTagsByPage = () => ({
  type: REQUEST_FETCH_TAGS_BY_PAGE,
});

const receiveFetchTagsByPage = (pageId: number, tagList: Array<T_Tag>) => ({
  type: RECEIVE_FETCH_TAGS_BY_PAGE,
  pageId,
  tagList,
});

export const fetchTagsByPage = (pageId: number) => (
  (dispatch: any) => {
    dispatch(requestDeleteTag());
    const tagList = db.getAllTagsByPageId(pageId);
    return dispatch(receiveFetchTagsByPage(pageId, tagList));
  }
);
