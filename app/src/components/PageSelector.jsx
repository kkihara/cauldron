// @flow

import React from 'react';
import type { T_Page } from '../types';

type Props = {
  ...T_Page,
  onClick: any
}

const PageSelector = ({ id, pageType, created, title, onClick }: Props) => (
  <li onClick={ onClick }>
    { created } | { title }
  </li>
);

export default PageSelector;
