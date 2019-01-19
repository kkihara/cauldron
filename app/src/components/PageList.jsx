// @flow

import React from 'react';
import moment from 'moment';
import type { T_Page } from '../types';
import styles from './PageList.css';

type SelectorProps = {
  ...T_Page,
  setPage: any
}

const PageSelector = ({ id, pageType, created, title, setPage }: SelectorProps) => {
  const createdStr = moment(created).format('YYYY-MM-DD HH:mm');
  return (
    <tr
      id={ id }
      className='pageSelector'
    onClick={ evt => {
      // clear selectedPage
      [...document.getElementsByClassName('selectedPage')].forEach(elem =>
        elem.classList.remove('selectedPage')
      );
      // add selectedPage to this element
      document.getElementById(id.toString()).classList.add('selectedPage');
      setPage();
    }}
    >
      <td>{ createdStr }</td>
      <td>{ title }</td>
    </tr>
  );
};

type ListProps = {
  pages: Array<T_Page>;
  setPage: any;
};


const PageList = ({ pages, setPage }: ListProps) => (
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
          setPage={ () => setPage(page.id) }
        />
      ))}
    </tbody>
  </table>
);

export default PageList;
