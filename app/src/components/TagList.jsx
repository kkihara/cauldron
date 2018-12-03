// @flow

import React from 'react';

type Props = {
  tags: Array<string>;
};

const TagList = ({ tags }: Props) => (
  <ul style={{
    'list-style-type': 'none',
    'margin': '0px'
  }}>
    {tags.map((tag, idx) =>
      <li key={ idx } style={{ 'float': 'left', 'padding': '5px' }}>
        <p style={{
          'border-radius': '10px / 7px',
          'border-color': '#000000',
          'border-style': 'solid',
          'padding': '10px'
        }}>
          { tag }
        </p>
      </li>
    )}
  </ul>
);

export default TagList;
