// @flow

import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './global.css';

const root = document.getElementById('root');

if (root !== null) {
  render(
    <App/>,
    root
  )
}
