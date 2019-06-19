// @flow

import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StickyDiv = styled.div`
  position: sticky;
  top: 32px;
`;

const SelectBar = ({ id, placeholder, options, query, search }) => (
  <StickyDiv>
    <Select
      isMulti
      inputId={ id }
      placeholder={ placeholder }
      options={ options }
      value={ query }
      delimiter=" "
      onChange={ search }
    />
  </StickyDiv>
);

export default SelectBar;
