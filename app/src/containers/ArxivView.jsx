// @flow

import React from 'react';
import { connect } from 'react-redux';
import { viewArxiv } from '../actions/views';

const ArxivView = ({ dispatch }) => (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(viewArxiv());
        }}
      >
        <button type="submit">Search Arxiv</button>
      </form>
    </div>
);

export default connect()(ArxivView);
