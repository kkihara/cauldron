// @flow

import React from 'react';
import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import DelayDispatchInput from '../components/DelayDispatchInput';


const SearchPages = ({ dispatch }: any) => {
  let input: { value: string };
  return (
    <DelayDispatchInput
      timeoutLength={ 500 }
      dispatchFn={ (input: string) => (
      dispatch(searchPages(input))
    )}/>
  );
};

export default connect()(SearchPages);
