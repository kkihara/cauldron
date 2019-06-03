// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Grid from '@material-ui/core/Grid';
import PageViewerContainer from './containers/PageViewerContainer';
import FilteredPageList from './containers/FilteredPageList';
import AddPage from './containers/AddPage';
import ArxivView from './containers/ArxivView';
import HomeView from './containers/HomeView';
import SearchPages from './containers/SearchPages';
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
          <AddPage/>
          <HomeView/>
          <ArxivView/>
        </Grid>
        <Grid item xs={ 9 }>
          <TagListContainer/>
        </Grid>
        <Grid item xs={ 3 }>
          <SearchPages/>
          <FilteredPageList/>
        </Grid>
        <Grid item xs={ 9 }>
          <PageViewerContainer/>
        </Grid>
      </Grid>
    </Provider>
  )
}

export default App;
