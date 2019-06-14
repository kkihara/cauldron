// @flow

import React from 'react';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import DelayDispatchInput from '../components/DelayDispatchInput';

type Props = {
  query: string,
  search: any,
};

const StickyDiv = styled.div`
  position: sticky;
  top: 0;
`;

  // background-image: url(${ img });
  // background-position: 4px 4px;
  // background-repeat: no-repeat;
  // height: 33px;
const Search = styled(DelayDispatchInput)`
  width: 100%;
  font-size: 15px;
  font-family: sans-serif;
`;

const SearchBar = ({ id, placeholder, query, search }: Props) => {
  return (
    <Box m={ 1 }>
      <StickyDiv>
        <Search
          id={ id }
          initialValue={ query }
          placeholder={ placeholder }
          timeoutLength={ 500 }
          dispatchFn={ search }/>
      </StickyDiv>
    </Box>
  );
};

export default SearchBar;
