// @flow

import React from 'react';
import PageSelector from './PageSelector';
import type { T_Page } from '../types';

type Props = {
  pages: Array<T_Page>;
  setPage: any;
};

const PageList = ({ pages, setPage }: Props) => (
  <ul>
    {pages.map(page => (
      <PageSelector
        key={ page.id }
        id={ page.id }
        pageType={ page.pageType }
        created={ page.created }
        title={ page.title }
        onClick={ () => setPage(page.id) }
      />
    ))}
  </ul>
);

export default PageList;
