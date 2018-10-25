// @flow

import React, { Component } from 'react';
import { render } from 'react-dom';
import SplitPane from 'react-split-pane';
import PdfPage from './components/PdfPage';
import styles from './App.css';
const fs = require('fs');
const { dialog } = require('electron').remote;

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
      <SplitPane split="vertical" defaultSize="25%">
        <div>
          <h1>Navigation!</h1>
          <button type="button" onClick={() => this.readFile()}>
            Choose file
          </button>
        </div>
        <SplitPane split="vertical" defaultSize="25%">
          <div><h1>Page List!</h1></div>
          <SplitPane split="horizontal" defaultSize="10%">
            <div>Tags and stuff</div>
            <PdfPage path={ this.state.pagePath } />
          </SplitPane>
        </SplitPane>
      </SplitPane>
    )
  }
}
