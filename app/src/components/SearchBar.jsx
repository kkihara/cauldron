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

const Search = styled(DelayDispatchInput)`
  background-image: url(${img});
  background-position: 6px 6px;
  background-repeat: no-repeat;
  height: 33px;
  width: 100%;
  padding-left: 33px;
  font-size: 12px;
  font-family: sans-serif;
`;

const SearchBar = ({ query, search }: Props) => {
  let input: { value: string };
  return (
    <Search
      id='search-bar'
      initialValue={ query }
      placeholder='Search pages'
      timeoutLength={ 500 }
      dispatchFn={ search }/>
  );
};

export default SearchBar;
