// @flow

import React from 'react';
import type { T_Tag } from '../types';

type Props = {
  tags: Array<T_Tag>;
};

const TagList = ({ tags }: Props) => (
  <ul style={{
    listStyleType: 'none',
    margin: '0px'
  }}>
    {tags.map((tag, idx) =>
      <li key={ idx } style={{ float: 'left', padding: '5px' }}>
        <p style={{
          borderRadius: '10px / 7px',
          borderColor: '#000000',
          borderStyle: 'solid',
          padding: '10px'
        }}>
          { tag.content }
        </p>
      </li>
    )}
  </ul>
);

export default TagList;
