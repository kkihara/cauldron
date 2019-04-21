// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import SplitPane from 'react-split-pane';
import PageViewerContainer from './containers/PageViewerContainer';
import FilteredPageList from './containers/FilteredPageList';
import AddPage from './containers/AddPage';
import SearchPages from './containers/SearchPages';
import AddTag from './containers/AddTag';
import TagListContainer from './containers/TagListContainer';
import rootReducer from './reducers';
import { createContextMenu } from './menu';
import { restoreState } from './utils';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger),
);

restoreState(store);
createContextMenu(store);

const App = () => {

  return (
    <Provider store={ store }>
      <SplitPane split='vertical' minSize={ 200 } defaultSize={ 200 }>
        <SplitPane
            split='horizontal'
            minSize={ 100 }
            maxSize={ 100 }
            defaultSize={ 100 }
            pane2Style={{ overflow: 'auto' }}
        >
          <div>
            <AddPage/>
          </div>
          <div>
            <SearchPages/>
            <FilteredPageList/>
          </div>
        </SplitPane>
        <SplitPane
            split='horizontal'
            maxSize={ 200 }
            defaultSize={ 100 }
            pane1Style={{ overflow: 'auto' }}
            pane2Style={{ overflow: 'auto' }}
        >
          <div>
            <AddTag/>
            <TagListContainer/>
          </div>
          <div>
            <PageViewerContainer/>
          </div>
        </SplitPane>
      </SplitPane>
    </Provider>
  )
}

export default App;
