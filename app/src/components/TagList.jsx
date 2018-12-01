// @flow

import React from 'react';

type Props = {
  tags: Array<string>;
};

const TagList = ({ tags }: Props) => (
  <ul>
  {tags.map((tag, idx) =>
    <li key={ idx }>{ tag }</li>
  )}
  </ul>
);

export default TagList;
