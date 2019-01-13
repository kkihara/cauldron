// @flow

import React from 'react';
import { connect } from 'react-redux';
import { newPage, putTitle } from '../actions/page';

const AddPage = ({ dispatch }) => {
  let input: { value: any };
  // TODO: validate state here?

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return;
          }
          const page = dispatch(newPage(input.value));
          input.value = '';
        }}
      >
        <input ref={(node: any) => (input = node)} />
        <button type="submit">New Page</button>
      </form>
    </div>
  )
};

export default connect()(AddPage);
