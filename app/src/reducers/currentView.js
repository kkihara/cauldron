// @flow

import {
  HOME_VIEW,
  ARXIV_VIEW,
} from '../actions';
import { viewTypes } from '../types';
import type { T_CurrentView } from '../types';

const initialState = {
 value: viewTypes.home,
};

const currentView = (
  state: T_CurrentView = initialState,
  action: any,
): T_CurrentView => {
  switch (action.type) {
    case HOME_VIEW:
      return {
        ...state,
        value: viewTypes.home,
      };
    case ARXIV_VIEW:
      return {
        ...state,
        value: viewTypes.arxiv,
      };
    default:
      return state;
  };
};

export default currentView;
