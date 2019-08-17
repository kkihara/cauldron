// @flow

import React from 'react';
import CreatableSelect from 'react-select/creatable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addTag } from '../actions/tag';
import { pageListToOptions } from '../utils';

const mapStateToProps = state => ({
  id: state.currentPage.id || null,
  options: pageListToOptions(state.pageList.pageList),
});

var inputState = '';
const handleInputChange = (newValue: string, action: { action: string }) => {
  console.log('abc', action, newValue);
  const inputValue = newValue.replace(/\W/g, '');
  if (action.action == 'input-change') {
    console.log('updating inputState', action, inputValue);
    inputState = inputValue;
  }
  return inputValue;
};

const handleChange = (newValue, action) => {
  if (action.action == 'select-option') {
    inputState = newValue.value;
  }
}

const selectStyle = {
  container: (provided, state) => ({
    ...provided,
    display: 'inline',
  }),
  control: (provided, state) => ({
    ...provided,
    width: 200,
    display: 'inline-flex',
  }),
  indicatorsContainer: (provided, state) => ({
    display: "none",
  }),
};

const AddTag = ({ id, options, dispatch }) => {
  if (!id) return null;

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!inputState.trim()) {
            return
          }
          dispatch(addTag(id, inputState))
        }}
      >
        <CreatableSelect
          inputId={ 'add-tag' }
          placeholder={ 'Add tag...' }
          options={ options }
          styles={ selectStyle }
          onInputChange={ handleInputChange }
          onChange={ handleChange }
        />
        <Button variant="contained" size="small" type="submit">New Tag</Button>
      </form>
    </div>
  )
};

export default connect(mapStateToProps)(AddTag);
