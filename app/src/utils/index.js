// @flow

import * as db from './db';
import { fetchAllPages } from '../actions/page';


export const restoreState = (store: any) => {
  store.dispatch(fetchAllPages());
};
