// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SplitPane from 'react-split-pane';
import PageViewerContainer from './containers/PageViewerContainer';
import FilteredPageList from './containers/FilteredPageList';
import AddPage from './containers/AddPage';
import rootReducer from './reducers';
import './App.css';
import PdfPageContainer from './containers/PdfPageContainer';
import * as actions from './actions';

const fs = require('fs');
const { dialog } = require('electron').remote;

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const App = () => {

  return (
    <Provider store={ store }>
      <SplitPane split='vertical' minSize={ 50 } defaultSize={ 200 }>
        <SplitPane split='horizontal' maxSize={ 50 } defaultSize={ 50 }>
          <div><AddPage/></div>
          <div><FilteredPageList/></div>
        </SplitPane>
        <div><PageViewerContainer/></div>
      </SplitPane>
    </Provider>
  )
}

export default App;
