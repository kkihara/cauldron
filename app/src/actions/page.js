// @flow

import {
  REQUEST_NEW_PAGE,
  RECEIVE_NEW_PAGE,
  REQUEST_PUT_TITLE,
  RECEIVE_PUT_TITLE,
  REQUEST_PUT_PAGETYPE,
  RECEIVE_PUT_PAGETYPE,
  REQUEST_FETCH_ALL_PAGES,
  RECEIVE_FETCH_ALL_PAGES,
  REQUEST_FETCH_PAGE,
  RECEIVE_FETCH_PAGE,
} from './';
import { fetchTagsByPage } from '../actions/tag';
import { pageTypes } from '../types';
import type { T_Page, T_PageTypes, T_CurrentPage } from '../types';
import * as db from '../utils/db';

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
    const page = db.insertPage(pageTypes.none, Date.now(), '');
    return dispatch(receiveNewPage(page));
  }
);

const requestPutTitle = () => ({
  type: REQUEST_PUT_TITLE,
});

const receivePutTitle = (id: number, title: string) => ({
  type: RECEIVE_PUT_TITLE,
  id,
  title,
});

export const putTitle = (id: number, title: string) => (
  (dispatch: any) => {
    dispatch(requestPutTitle());
    const page = db.updateTitle(id, title);
    return dispatch(receivePutTitle(id, title));
  }
);

const requestPutPageType = () => ({
  type: REQUEST_PUT_PAGETYPE,
});

const receivePutPageType = (id: number, pageType: T_PageTypes) => ({
  type: RECEIVE_PUT_PAGETYPE,
  id,
  pageType,
});

export const putPageType = (id: number, pageType: T_PageTypes) => (
  (dispatch: any) => {
    // TODO: error check current pageType is none
    dispatch(requestPutPageType());
    db.updatePageType(id, pageType);
    return dispatch(receivePutPageType(id, pageType));
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
    const pageList = db.getAllPages();
    return dispatch(receiveFetchAllPages(pageList));
  }
);

const requestFetchPage = () => ({
  type: REQUEST_FETCH_PAGE,
});

const receiveFetchPage = (page: T_CurrentPage) => ({
  type: RECEIVE_FETCH_PAGE,
  page,
});

export const fetchPage = (id: number) => (
  (dispatch: any) => {
    dispatch(requestFetchPage());
    const page = db.loadPageById(id);
    dispatch(fetchTagsByPage(id));
    return dispatch(receiveFetchPage(page));
  }
)
