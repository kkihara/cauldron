// @flow

import React from 'react';
import styled from 'styled-components';
import type { T_Tag } from '../types';

type Props = {
  tags: Array<T_Tag>,
  searchTag: any,
};

const List = styled.ul`
  list-style-type: none;
  margin: 0px;
`;

const TagElement = styled.li`
  float: left;
  padding: 5px;
`;

const Tag = styled.p`
  border-radius: 10px / 7px;
  border-color: #000000;
  border-style: solid;
  padding: 10px;
`;

const TagList = ({ tags, searchTag }: Props) => (
  <List>
    {tags.map((tag, idx) =>
      <TagElement key={ idx }>
        <Tag onClick={ () => searchTag(tag.content) }>
          { tag.content }
        </Tag>
      </TagElement>
    )}
  </List>
);

export default TagList;
