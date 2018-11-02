// @flow

import { NEW_PAGE } from '../actions';

type Page = {
  id: string,
  created: string,
  title: string
};

type Action = {
  type: string,
  ...Page
};

const pages = (
  state: Array<?Page> = [],
  action: Action) => {

  switch (action.type) {
    case NEW_PAGE:
      return [
        ...state,
        {
          id: action.id,
          created: action.created,
          title: action.title
        }
      ]
    default:
      return state
  }
};

export default pages;
