// @flow

import React from 'react';
import { connect } from 'react-redux';
import { setPdfPage } from '../actions';

const AddPage = ({ dispatch, getState }) => {
  let input: { value: any };
  // TODO: validate state here?
  const state = getState();
  const id = state.currentPage.id;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(setPdfPage(id, input.value))
          input.value = ''
        }}
      >
        <input ref={(node: any) => (input = node)} />
        <button type="submit">New Page</button>
      </form>
    </div>
  )
};

export default connect()(AddPage);
