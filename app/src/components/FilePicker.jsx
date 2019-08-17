// @flow

import React from 'react';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import fs from 'fs';
import { remote } from 'electron';
const dialog = remote.dialog;

type Props = {
  id: string,
  text: string,
  setPath: any
};

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
  <Button variant="contained" size="small" onClick={ () => readFile(setPath(id))}
  >
    { text }
    <CloudUploadIcon/>
  </Button>
);

export default FilePicker;
