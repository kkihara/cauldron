// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import SplitPane from 'react-split-pane';
import PdfPage from './components/PdfPage';
import AddPage from './containers/AddPage';
import FilteredPageList from './containers/FilteredPageList';
import styles from './App.css';
import rootReducer from './reducers';
const fs = require('fs');
const { dialog } = require('electron').remote;

const store = createStore(rootReducer);

type Props = {};
type State = {
  pagePath: string
};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pagePath: ''
    };
  }

  readFile() {
    dialog.showOpenDialog((fileNames) => {
      if(fileNames === undefined){
        console.log("No file selected");
        return;
      }

      fs.readFile(fileNames[0], 'utf-8', (err, data) => {
        if(err){
          alert("An error ocurred reading the file :" + err.message);
          return;
        }

        // handle displaying the file contents
        console.log("The file content is : " + data);
        this.setState({ pagePath: fileNames[0] });
      });
    });
  }

  render() {
    return (
      <Provider store={ store }>
        <SplitPane split="vertical" defaultSize="25%">
          <div>
            <h1>Navigation!</h1>
            <button type="button" onClick={() => this.readFile()}>
              Choose file
            </button>
          </div>
          <SplitPane split="vertical" defaultSize="25%">
            <div>
              <AddPage />
              <FilteredPageList />
            </div>
            <SplitPane split="horizontal" defaultSize="10%">
              <div>Tags and stuff</div>
              <PdfPage path={ this.state.pagePath } />
            </SplitPane>
          </SplitPane>
        </SplitPane>
      </Provider>
    )
  }
}
