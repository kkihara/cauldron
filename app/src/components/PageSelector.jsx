// @flow

import React from 'react';
import moment from 'moment';
import type { T_Page } from '../types';

type Props = {
  ...T_Page,
  onClick: any
}

const PageSelector = ({ id, pageType, created, title, onClick }: Props) => (
  <tr onClick={ onClick }>
    <td>{ moment({ created }).format('YYYY-MM-DD HH:mm') }</td>
    <td>{ title }</td>
  </tr>
);

export default PageSelector;
