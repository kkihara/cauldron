// @flow

import React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import AddTag from '../containers/AddTag';
import type { T_Tag } from '../types';
// import img from '../../assets/delete-icon.png';

type Props = {
  tags: Array<T_Tag>,
  isHome: bool,
  searchTag: any,
  deleteTag: any,
};

const TagList = ({ tags, isHome, searchTag, deleteTag }: Props) => {
  if (isHome) {
    return (
      <div>
        <AddTag/>
        {tags.map((tag, idx) =>
          <Chip
            key={ idx }
            label={ tag.content }
            onClick={ () => searchTag(tag.content) }
            onDelete={ () => deleteTag(tag.id) }
            clickable={ true }
          />
        )}
      </div>
    )
  } else {
    return null;
  }
};

export default TagList;
