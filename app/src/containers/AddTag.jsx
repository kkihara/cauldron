// @flow

import React from 'react';
import { connect } from 'react-redux';
import { addTag } from '../actions/tag';

const mapStateToProps = state => ({
  id: state.currentPage.id || null
})

const AddTag = ({ id, dispatch }) => {
  if (!id) return null;

  let input: { value: any };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addTag(id, input.value))
          input.value = ''
        }}
      >
        <input ref={(node: any) => (input = node)} />
        <button type="submit">New Tag</button>
      </form>
    </div>
  )
};

export default connect(mapStateToProps)(AddTag);
