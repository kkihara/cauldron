// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PageViewerContainer from './containers/PageViewerContainer';
import rootReducer from './reducers';

const fs = require('fs');
const { dialog } = require('electron').remote;

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const App = () => {

  return (
    <Provider store={ store }>
      <PageViewerContainer/>
    </Provider>
  )

  // react-split
  // render() {
  //   return (
  //     <Provider store={ store }>
  //       <Split direction="vertical" sizes={[25, 75]}>
  //         <div>
  //           <h1>Navigation!</h1>
  //           <button type="button" onClick={() => this.readFile()}>
  //             Choose file
  //           </button>
  //         </div>
  //         <Split direction="vertical" size={[25, 75]}>
  //           <div>
  //             <AddPage />
  //             <FilteredPageList />
  //           </div>
  //           <Split direction="horizontal" size={[10, 90]}>
  //             <div>Tags and stuff</div>
  //             <MyPdfPage />
  //           </Split>
  //         </Split>
  //       </Split>
  //     </Provider>
  //   )
  // }
  // react-reflex
  // render() {
  //   return (
  //     <Provider store={ store }>
  //       <ReflexContainer orientation="vertical">
  //         <ReflexElement className="left-pane" flex={ 0.25 }>
  //           <div>
  //             <h1>Navigation!</h1>
  //             <button type="button" onClick={() => this.readFile()}>
  //               Choose file
  //             </button>
  //           </div>
  //         </ReflexElement>
  //         <ReflexSplitter propagate={ true }/>
  //         <ReflexElement flex={ 0.25 }>
  //           <div>
  //             <AddPage />
  //             <FilteredPageList />
  //           </div>
  //         </ReflexElement>
  //         <ReflexSplitter/>
  //         <ReflexElement flex={ 0.75 }>
  //           <div>YO</div>
  //         </ReflexElement>
  //       </ReflexContainer>
  //     </Provider>
  //   )
  // }
}

export default App;
