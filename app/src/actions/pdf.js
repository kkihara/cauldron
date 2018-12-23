// @flow

import pdfjs from 'pdfjs-dist/webpack';
import {
REQUEST_UPLOAD_PDF,
RECEIVE_UPLOAD_PDF,
REQUEST_PUT_HIGHLIGHT,
RECEIVE_PUT_HIGHLIGHT,
} from './';
import { putPageType } from './page';
import { pageDB } from '../utils/db';
import { pageTypes } from '../types';
import type { T_Page } from '../types';

const requestUploadPdf = () => ({
  type: REQUEST_UPLOAD_PDF,
});

const receiveUploadPdf = () => ({
  type: RECEIVE_UPLOAD_PDF,
});

const PDF_ID = 'pdf';
export const uploadPdf = (id: string, path: string) => (
  (dispatch: any) => {
    dispatch(requestUploadPdf());

    pdfjs.getDocument(path).then(pdfDocument => {
      pdfDocument.getData()
    }).then(pdfData => {
      return new Blob([pdfData], {type: 'text/plain'});
    }).then(blob => {
      return pageDB.putAttachment(
        id, PDF_ID, blob, 'text/plain'
      );
    }).then(res => {
      dispatch(putPageType(id, pageTypes.pdf));
      dispatch(receiveUploadPdf());
    }).catch(err => {
      console.log(err);
    })
  }
);

const requestPutHighlight = () => ({
  type: REQUEST_PUT_HIGHLIGHT,
});

const receivePutHighlight = (id: string, highlight: string) => ({
  type: RECEIVE_PUT_HIGHLIGHT,
  id,
  highlight,
});

export const putHighlight = (id: string, highlight: string) => (
  (dispatch: any) => {
    dispatch(requestPutHighlight());

    pageDB.get(id).then(page => {
      page.highlight = highlight;
      return pageDB.put(page);
    }).then(() => {
      return pageDB.get(id);
    }).then(page => {
      return dispatch(receivePutHighlight(id, highlight));
    }).catch(err => {
      console.log(err);
    })
  }
);
