// @flow

import React from 'react';

type Props = {
  tags: Array<string>;
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
          { tag }
        </p>
      </li>
    )}
  </ul>
);

export default TagList;
