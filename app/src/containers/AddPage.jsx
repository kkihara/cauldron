// @flow

import React from 'react';
import Button from '@material-ui/core/Button';
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
        <Button variant="contained" size="small" type="submit">New Page</Button>
      </form>
    </div>
);

export default connect()(AddPage);
