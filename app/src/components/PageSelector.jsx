// @flow

import React from 'react';
import moment from 'moment';
import type { T_Page } from '../types';

type Props = {
  ...T_Page,
  onClick: any
}

const PageSelector = ({ id, pageType, created, title, onClick }: Props) => {
  const createdStr = moment(created).format('YYYY-MM-DD HH:mm');
  return (
    <tr onClick={ onClick }>
      <td>{ createdStr }</td>
      <td>{ title }</td>
    </tr>
  );
};

export default PageSelector;
