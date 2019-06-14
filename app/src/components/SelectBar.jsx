// @flow

import React from 'react';
import Select from 'react-select';

const SelectBar = ({ id, placeholder, options, query, search }) => (
  <Select
    isMulti
    inputId={ id }
    placeholder={ placeholder }
    options={ options }
    value={ query }
    delimiter=" "
    onChange={ search }
  />
);

export default SelectBar;
