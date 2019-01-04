// @flow

import pdfjs from 'pdfjs-dist/webpack';
import {
REQUEST_UPLOAD_PDF,
RECEIVE_UPLOAD_PDF,
REQUEST_PUT_HIGHLIGHTS,
RECEIVE_PUT_HIGHLIGHTS,
} from './';
import * as db from '../utils/db';
import { putPageType } from './page';
import { pageTypes } from '../types';
import type { T_Page } from '../types';

const requestUploadPdf = () => ({
  type: REQUEST_UPLOAD_PDF,
});

const receiveUploadPdf = (id: number, content: Buffer) => ({
  type: RECEIVE_UPLOAD_PDF,
  id,
  content,
});

const PDF_ID = 'pdf';
export const uploadPdf = (id: number, path: string) => (
  (dispatch: any) => {
    dispatch(requestUploadPdf());

    pdfjs.getDocument(path).then(pdfDocument => {
      pdfDocument.getData()
    }).then(pdfData => {
      // TODO: Does TypedArray need to be converted to Buffer?
      db.insertPdf(
        id,
        pdfData,
        () => {
          dispatch(putPageType(id, pageTypes.pdf));
          dispatch(receiveUploadPdf(id, pdfData));
        },
      );
    }).catch(err => {
      console.log(err);
    })
  }
);

const requestPutHighlight = () => ({
  type: REQUEST_PUT_HIGHLIGHTS,
});

const receivePutHighlight = (id: number, highlights: string) => ({
  type: RECEIVE_PUT_HIGHLIGHTS,
  id,
  highlights,
});

export const putHighlight = (id: number, highlights: string) => (
  (dispatch: any) => {
    dispatch(requestPutHighlight());

    db.updateHighlights(
      id,
      highlights,
      () => dispatch(receivePutHighlight(id, highlights)),
    );
  }
);
