// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PageViewerContainer from './containers/PageViewerContainer';
import FilteredPageList from './containers/FilteredPageList';
import AddPage from './containers/AddPage';
import ArxivView from './containers/ArxivView';
import HomeView from './containers/HomeView';
import SearchPages from './containers/SearchPages';
import SearchTags from './containers/SearchTags';
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
      <Grid container spacing={ 1 }>
        <Grid item xs={ 3 }>
          <Paper style={{ height: '10vh' }}>
            <AddPage/>
          </Paper>
        </Grid>
        <Grid item xs={ 9 }>
          <Paper style={{ height: '10vh', overflow: 'auto' }}>
            <TagListContainer/>
          </Paper>
        </Grid>
        <Grid item xs={ 3 }>
          <Paper style={{ height: '85vh', overflow: 'auto' }}>
            <SearchPages/>
            <SearchTags/>
            <FilteredPageList/>
          </Paper>
        </Grid>
        <Grid item xs={ 9 }>
          <Paper style={{ height: '85vh', overflow: 'auto' }}>
            <PageViewerContainer/>
          </Paper>
        </Grid>
      </Grid>
    </Provider>
  )
}

export default App;
