// @flow

import React from 'react';
import Page from './Page';
import type { PageProps } from './Page';

type Props = {
  pages: Array<PageProps>;
};

const PageList = ({ pages }: Props) => (
  <ul>
    {pages.map(page => (
      <Page id={ page.id }title={ page.title } created={ page.created }/>
    ))}
  </ul>
);

export default PageList;
