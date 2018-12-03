// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SplitPane from 'react-split-pane';
import PageViewerContainer from './containers/PageViewerContainer';
import FilteredPageList from './containers/FilteredPageList';
import AddPage from './containers/AddPage';
import AddTag from './containers/AddTag';
import TagListContainer from './containers/TagListContainer';
import rootReducer from './reducers';
import './App.css';
import PdfPageContainer from './containers/PdfPageContainer';
import * as actions from './actions';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const App = () => {

  return (
    <Provider store={ store }>
      <SplitPane split='vertical' minSize={ 50 } defaultSize={ 200 }>
        <SplitPane
            split='horizontal'
            maxSize={ 200 }
            defaultSize={ 100 }
            pane2Style={{ overflow: 'auto' }}
        >
          <div><AddPage/></div>
          <div><FilteredPageList/></div>
        </SplitPane>
        <SplitPane
            split='horizontal'
            maxSize={ 200 }
            defaultSize={ 100 }
            pane2Style={{ overflow: 'auto' }}
        >
          <div>
            <AddTag/>
            <TagListContainer/>
          </div>
          <div><PageViewerContainer/></div>
        </SplitPane>
      </SplitPane>
    </Provider>
  )
}

export default App;
