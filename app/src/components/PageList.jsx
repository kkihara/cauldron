// @flow

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import type { T_Page } from '../types';

type SelectorProps = {
  ...T_Page,
  currentId: number,
  index: number,
  setPage: any,
};

const SelectorRow = styled.tr`
  background-color: ${ props => props.color };
`;
const selectedColor = '#e0ffff';
const evenColor = '#ffffff';
const oddColor = '#eeeeee';

const Cell = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

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
  let color;
  if (id == currentId) { color = selectedColor; }
  else if (index % 2 == 0) { color = evenColor; }
  else { color = oddColor; }
  return (
    <SelectorRow
      id={ id }
      onClick={ () => setPage() }
      color={ color }
    >
      <Cell>{ createdStr }</Cell>
      <Cell>{ title }</Cell>
    </SelectorRow>
  );
};

type ListProps = {
  pages: Array<T_Page>,
  currentId: number,
  setPage: any,
};

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  user-select: none;
  cursor: default;
  font-size: small;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const PageList = ({ pages, currentId, setPage }: ListProps) => (
  <Table>
    <thead>
      <tr>
        <TableHeader>Created</TableHeader>
        <TableHeader>Title</TableHeader>
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
  </Table>
);

export default PageList;
