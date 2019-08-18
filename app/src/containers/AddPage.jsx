// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { newPage, putTitle } from '../actions/page';

const StyledButton = withStyles({
  root: {
    textTransform: 'none',
  },
})(Button);

const AddPage = ({ dispatch }) => (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch(newPage());
        }}
      >
        <StyledButton variant="contained" size="small" type="submit">New Page</StyledButton>
      </form>
    </div>
);

export default connect()(AddPage);
