// @flow

import React from 'react';
import type { T_PageSelector } from '../types';

const PageSelector = ({ id, title, created }: T_PageSelector) => (
  <li>
    { created } | { title }
  </li>
);

export default PageSelector;
