// @flow

import * as db from './db';
import { fetchAllPages } from '../actions/page';
import { fetchAllTags } from '../actions/tag';


export const restoreState = (store: any) => {
  store.dispatch(fetchAllPages());
  store.dispatch(fetchAllTags());
};
