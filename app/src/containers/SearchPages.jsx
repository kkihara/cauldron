// @flow

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import DelayDispatchInput from '../components/DelayDispatchInput';
import img from '../../assets/search-icon.png';

const SearchBar = styled(DelayDispatchInput)`
  background-image: url(${img});
  background-position: 6px 6px;
  background-repeat: no-repeat;
  height: 33px;
  width: 100%;
  padding-left: 33px;
  font-size: 12px;
  font-family: sans-serif;
`;


const SearchPages = ({ dispatch }: any) => {
  let input: { value: string };
  return (
    <SearchBar
      id='search-bar'
      initialValue=''
      placeholder='Search pages'
      timeoutLength={ 500 }
      dispatchFn={ (input: string) => (
      dispatch(searchPages(input))
    )}/>
  );
};

export default connect()(SearchPages);
