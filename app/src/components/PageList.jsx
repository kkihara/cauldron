// @flow

import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment';
import type { T_Page } from '../types';

type SelectorProps = {
  ...T_Page,
  currentId: number,
  index: number,
  setPage: any,
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
  return (
    <TableRow
      onClick={ () => setPage() }
      selected={ id == currentId }
    >
      <TableCell>{ createdStr }</TableCell>
      <TableCell>{ title }</TableCell>
    </TableRow>
  );
};

type ListProps = {
  pages: Array<T_Page>,
  currentId: number,
  setPage: any,
};

const PageList = ({ pages, currentId, setPage }: ListProps) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Created</TableCell>
        <TableCell>Title</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
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
    </TableBody>
  </Table>
);

export default PageList;
