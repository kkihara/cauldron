// @flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

const StyledButton = withStyles({
  root: {
    textTransform: 'none',
  },
})(Button);

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
  <StyledButton variant="contained" size="small" onClick={ () => readFile(setPath(id))}
  >
    { text }
    <CloudUploadIcon/>
  </StyledButton>
);

export default FilePicker;
