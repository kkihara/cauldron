// @flow

import uuid from 'uuid';
import {
  REQUEST_NEW_PAGE,
  RECEIVE_NEW_PAGE,
  REQUEST_PUT_TITLE,
  RECEIVE_PUT_TITLE,
  REQUEST_PUT_PAGETYPE,
  RECEIVE_PUT_PAGETYPE,
  REQUEST_FETCH_ALL_PAGES,
  RECEIVE_FETCH_ALL_PAGES,
} from './';
import { pageDB } from '../utils/db';
import { pageTypes } from '../types';
import type { T_Page, T_PageTypes } from '../types'

const requestNewPage = () => ({
  type: REQUEST_NEW_PAGE,
});

const receiveNewPage = (page: T_Page) => ({
  type: RECEIVE_NEW_PAGE,
  page,
});

export const newPage = () => (
  (dispatch: any) => {
    dispatch(requestNewPage());

    pageDB.put({
      _id: uuid.v4(),
      pageType: pageTypes.none,
      created: Date.now(),
      title: '',
      highlights: null,
    }).then(page => {
      return dispatch(receiveNewPage(page));
    }).catch(err => {
      console.log(err);
    });
  }
);

const requestPutTitle = () => ({
  type: REQUEST_PUT_TITLE,
});

const receivePutTitle = (page: T_Page) => ({
  type: RECEIVE_PUT_TITLE,
  id: page._id,
  title: page.title,
});

export const putTitle = (id: string, title: string) => (
  (dispatch: any) => {
    dispatch(requestPutTitle());

    pageDB.get(id).then(page => {
        page.title = title;
        return pageDB.put(page);
    }).then(() => {
      return pageDB.get(id);
    }).then(page => {
      dispatch(receivePutTitle(page));
    }).catch(err => {
      console.log(err);
    });
  }
);

const requestPutPageType = () => ({
  type: REQUEST_PUT_PAGETYPE,
});

const receivePutPageType = (page: T_Page) => ({
  type: RECEIVE_PUT_PAGETYPE,
  id: page._id,
  pageType: page.pageType,
});

export const putPageType = (id: string, pageType: T_PageTypes) => (
  (dispatch: any) => {
    // TODO: error check current pageType is none
    dispatch(requestPutPageType());

    pageDB.get(id).then(page => {
        page.pageType = pageType;
        return pageDB.put(page);
    }).then(() => {
      return pageDB.get(id);
    }).then(page => {
      return dispatch(receivePutPageType(page))
    }).catch(err => {
      console.log(err);
    });
  }
);

const requestFetchAllPages = () => ({
  type: REQUEST_FETCH_ALL_PAGES,
});

const receiveFetchAllPages = (pageList: Array<T_Page>) => ({
  type: RECEIVE_PUT_PAGETYPE,
  pageList: pageList,
});

export const fetchAllPages = () => (
  (dispatch: any) => {
    dispatch(requestFetchAllPages());

    pageDB.allDocs({
      include_docs: true,
    }).then(res => {
      return res.rows.map(row => row.doc);
    }).then(pageList => {
      return dispatch(receiveFetchAllPages(pageList));
    }).catch(err => {
      console.log(err);
    });
  }
);
