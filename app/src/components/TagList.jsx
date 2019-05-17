// @flow

import React from 'react';
import styled from 'styled-components';
import AddTag from '../containers/AddTag';
import type { T_Tag } from '../types';
// import img from '../../assets/delete-icon.png';

type Props = {
  tags: Array<T_Tag>,
  searchTag: any,
};

const List = styled.ul`
  list-style-type: none;
  margin: 0px;
`;

const TagElement = styled.li`
  display: inline-block;
  padding: 2px;
  cursor: pointer;
`;

const Tag = styled.p`
  border-radius: 10px / 7px;
  border-color: #000000;
  border-style: solid;
  padding: 7px;
  list-style-position: inside;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 50px;
  font-size: 12px;
`;

// const RemoveButton = styled.img`
//   height: 10px;
//   width: 10px;
//   padding-left: 2px;
//   float: left;
// `;

const TagList = ({ tags, isHome, searchTag }: Props) => {
  if (isHome) {
    return (
      <div>
        <AddTag/>
        <List>
          {tags.map((tag, idx) =>
            <TagElement key={ idx } onClick={ () => searchTag(tag.content) }>
              <Tag>
                { tag.content }
              </Tag>
            </TagElement>
          )}
        </List>
      </div>
    )
  } else {
    return null;
  }
};

export default TagList;
