// @flow

import React from 'react';
import PageSelector from './PageSelector';
import type { T_Page } from '../types';
import './PageList.css';

type Props = {
  pages: Array<T_Page>;
  setPage: any;
};

const PageList = ({ pages, setPage }: Props) => (
  <table>
    <thead>
      <tr>
        <th>Created</th>
        <th>Title</th>
      </tr>
    </thead>
    <tbody>
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
    </tbody>
  </table>
);

export default PageList;
