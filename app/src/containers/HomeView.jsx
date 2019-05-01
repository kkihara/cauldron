// @flow

import React from 'react';
import { connect } from 'react-redux';
import { viewHome } from '../actions/views';

const HomeView = ({ dispatch }) => (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(viewHome());
        }}
      >
        <button type="submit">Home</button>
      </form>
    </div>
);

export default connect()(HomeView);
