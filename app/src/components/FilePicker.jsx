// @flow

import React from 'react';
import fs from 'fs';

const { dialog } = require('electron').remote;

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
    // fs.readFile(fileNames[0], 'utf-8', (err, data) => {
    //   if(err){
    //     alert("An error ocurred reading the file :" + err.message);
    //     return;
    //   }

    //   // handle displaying the file contents
    //   console.log("The file content is : " + data);
    // });
  });
};

const FilePicker = ({ id, text, setPath }: Props) => (
  <button onClick={ () => readFile(setPath(id)) }>
    { text }
  </button>
);

export default FilePicker;
