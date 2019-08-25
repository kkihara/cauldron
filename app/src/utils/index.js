// @flow

import * as db from './db';
import { fetchAllPages } from '../actions/page';


let _store;
export const setGlobalStore = (store: any) => {
  _store = store;
};

export const getGlobalStore = () => {
  return _store;
};

export const restoreState = () => {
  _store.dispatch(fetchAllPages());
};

export const pageListToOptions = pageList => {
  const tags = [];
  pageList.forEach(page => {
    if (page.tags) {
      tags.push(...page.tags);
    }
  });
  const uniqueTags = [...new Set(tags)];
  return uniqueTags.map(t => ({ label: t, value: t }));
};

