// @flow

import React from 'react';
import PageSelector from './PageSelector';
import type { T_PageSelector } from '../types';

type Props = {
  pages: Array<T_PageSelector>;
};

const PageList = ({ pages }: Props) => (
  <ul>
    {pages.map(page => (
      <PageSelector id={ page.id }title={ page.title } created={ page.created }/>
    ))}
  </ul>
);

export default PageList;
