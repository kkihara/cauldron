// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import AddTag from '../containers/AddTag';
import type { T_Tag } from '../types';

type Props = {
  tags: Array<T_Tag>,
  isHome: bool,
  searchTag: any,
  deleteTag: any,
};

const StyledChip = withStyles({
  root: {
    margin: '3px'
  }
})(({ classes, color, ...other }) => <Chip className={ classes.root } { ...other } />);

const TagList = ({ tags, isHome, searchTag, deleteTag }: Props) => {
  if (isHome) {
    return (
      <div>
        <AddTag/>
        {tags.map((tag, idx) =>
          <StyledChip
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
