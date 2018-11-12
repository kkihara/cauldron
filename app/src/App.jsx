// @flow

import React from 'react';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import AddPage from './containers/AddPage';
// import FilteredPageList from './containers/FilteredPageList';
// import styles from './App.css';
import DisplayPdfPage from './containers/DisplayPdfPage';
import rootReducer from './reducers';
import { loadPdf } from './actions';  // TODO: load from a page click

const fs = require('fs');
const { dialog } = require('electron').remote;

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware)
);

const App = () => {

  return (
    <Provider store={ store }>
      <DisplayPdfPage/>
    </Provider>
  )

  // readFile() {
  //   dialog.showOpenDialog((fileNames) => {
  //     if(fileNames === undefined){
  //       console.log("No file selected");
  //       return;
  //     }

  //     fs.readFile(fileNames[0], 'utf-8', (err, data) => {
  //       if(err){
  //         alert("An error ocurred reading the file :" + err.message);
  //         return;
  //       }

  //       // handle displaying the file contents
  //       console.log("The file content is : " + data);
  //       this.setState({ pagePath: fileNames[0] });
  //     });
  //   });
  // }

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

// TODO: load from a page click
const pdfFile = '/Users/panda/Downloads/1512.03385.pdf';
store.dispatch(loadPdf(pdfFile));
  // .then(() => console.log('PDF LOADED!!!'));

export default App;
