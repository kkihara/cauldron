// @flow

import React from 'react';
import moment from 'moment';
import type { T_Page } from '../types';
import styles from './PageList.css';

type SelectorProps = {
  ...T_Page,
  currentId: number,
  index: number,
  setPage: any,
};

const evenRowStyle = {
  backgroundColor: '#eeeeee',
};

const PageSelector = ({
    id,
    currentId,
    pageType,
    created,
    title,
    setPage,
    index,
}: SelectorProps) => {
  const createdStr = moment(created).format('YYYY-MM-DD HH:mm');
  let selectorStyle;
  if (id == currentId) { selectorStyle = 'selected-page' }
  else if (index % 2 == 0) { selectorStyle = 'even-page' }
  else { selectorStyle = 'odd-page' }
  return (
    <tr
      id={ id }
      className={ styles[selectorStyle] }
      onClick={ () => setPage() }
    >
      <td className={ styles['page-row'] }>{ createdStr }</td>
      <td className={ styles['page-row'] }>{ title }</td>
    </tr>
  );
};

type ListProps = {
  pages: Array<T_Page>,
  currentId: number,
  setPage: any,
};


const PageList = ({ pages, currentId, setPage }: ListProps) => (
  <table className={ styles['page-table'] }>
    <thead>
      <tr>
        <th className={ styles['page-row'] }>Created</th>
        <th className={ styles['page-row'] }>Title</th>
      </tr>
    </thead>
    <tbody>
      {pages.map((page, index) => (
        <PageSelector
          key={ page.id }
          id={ page.id }
          currentId={ currentId }
          pageType={ page.pageType }
          created={ page.created }
          title={ page.title }
          setPage={ () => setPage(page.id) }
          index={ index }
        />
      ))}
    </tbody>
  </table>
);

export default PageList;
