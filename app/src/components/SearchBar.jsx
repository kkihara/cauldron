// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import DelayDispatchInput from '../components/DelayDispatchInput';
import img from '../../assets/search-icon.png';

type Props = {
  query: string,
  search: any,
};

const StickyDiv = styled.div`
  position: sticky;
  top: 0;
`;

const Search = styled(DelayDispatchInput)`
  background-image: url(${img});
  background-position: 6px 6px;
  background-repeat: no-repeat;
  height: 33px;
  width: 100%;
  padding-left: 33px;
  font-size: 10px;
  font-family: sans-serif;
`;

const SearchBar = ({ query, search }: Props) => {
  let input: { value: string };
  return (
    <StickyDiv>
      <Search
        id='search-bar'
        initialValue={ query }
        placeholder='Search pages'
        timeoutLength={ 500 }
        dispatchFn={ search }/>
    </StickyDiv>
  );
};

export default SearchBar;
