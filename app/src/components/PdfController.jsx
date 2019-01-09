// @flow

import React, { Component } from 'react';

type Props = {

};

const topRight = {
  position: 'fixed',
  top: '0',
  right: '0',
  zIndex: 10
}

const roundButton = {
  borderRadius: '50%'
}

const PdfController = ({}: Props) => (
  <div style={ topRight }>
    <button style={ roundButton }>-</button>
    <button style={ roundButton }>+</button>
  </div>
);

export default PdfController;
