// @flow

import React from 'react';
import fs from 'fs';
import { remote } from 'electron';
const dialog = remote.dialog;

type Props = {
  id: string,
  text: string,
  setPath: any
}

const readFile = (callback: any) => {
  dialog.showOpenDialog((fileNames) => {
    if(fileNames === undefined){
      console.log("No file selected");
      return;
    }

    callback(fileNames[0]);
  });
};

const FilePicker = ({ id, text, setPath }: Props) => (
  <button onClick={ () => readFile(setPath(id)) }>
    { text }
  </button>
);

export default FilePicker;
