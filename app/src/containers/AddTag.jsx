// @flow

import React from 'react';
import CreatableSelect from 'react-select/creatable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { addTag } from '../actions/tag';
import { pageListToOptions } from '../utils';

const StyledButton = withStyles({
  root: {
    textTransform: 'none',
  },
})(Button);


const mapStateToProps = state => ({
  id: state.currentPage.id || null,
  options: pageListToOptions(state.pageList.pageList),
});

var inputState = '';
const handleInputChange = (newValue: string, action: { action: string }) => {
  if (action.action == 'input-change') {
    inputState = newValue;
  }
  return newValue;
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
        <StyledButton variant="contained" size="small" type="submit">New Tag</StyledButton>
      </form>
    </div>
  )
};

export default connect(mapStateToProps)(AddTag);
