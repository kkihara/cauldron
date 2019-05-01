// @flow

import React from 'react';
import { connect } from 'react-redux';
import { newPage, putTitle } from '../actions/page';

const AddPage = ({ dispatch }) => (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(newPage());
        }}
      >
        <button type="submit">New Page</button>
      </form>
    </div>
);

export default connect()(AddPage);
