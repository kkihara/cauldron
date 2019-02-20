// @flow

import React from 'react';
import styled from 'styled-components';
import type { T_Tag } from '../types';

type Props = {
  tags: Array<T_Tag>;
};

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

const TagList = ({ tags }: Props) => (
  <ul style={{
    listStyleType: 'none',
    margin: '0px'
  }}>
    {tags.map((tag, idx) =>
      <TagElement>
        <Tag>
          { tag.content }
        </Tag>
      </TagElement>
    )}
  </ul>
);

export default TagList;
