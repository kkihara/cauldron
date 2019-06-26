// @flow

import {
  REQUEST_ADD_TAG,
  RECEIVE_ADD_TAG,
  REQUEST_DELETE_TAG,
  RECEIVE_DELETE_TAG,
} from './';
import * as db from '../utils/db';
import type { T_Tag } from '../types';

const requestAddTag = () => ({
  type: REQUEST_ADD_TAG,
});

const receiveAddTag = (id: string, tag: string) => ({
  type: RECEIVE_ADD_TAG,
  id,
  tag,
});

export const addTag = (id: string, content: string) => (
  (dispatch: any) => {
    dispatch(requestAddTag());
    db.insertTag(
      id,
      content,
      tag => dispatch(receiveAddTag(id, tag)),
    );
  }
);

const requestDeleteTag = () => ({
  type: REQUEST_DELETE_TAG,
});

const receiveDeleteTag = (id: string, tag: string) => ({
  type: RECEIVE_DELETE_TAG,
  id,
  tag,
});

export const deleteTag = (id: string, tag: string) => (
  (dispatch: any) => {
    dispatch(requestDeleteTag());
    db.deleteTag(
      id,
      tag,
      () => dispatch(receiveDeleteTag(id, tag)),
    );
  }
);
