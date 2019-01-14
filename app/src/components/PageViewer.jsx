// @flow

import React from 'react';
import PdfPageContainer from '../containers/PdfPageContainer';
import UploadPdf from '../containers/UploadPdf';
import Loading from './Loading';
import { pageTypes } from '../types';
import type { T_CurrentPage } from '../types';

type Props = {
  page: T_CurrentPage,
  setTitle: any,
  isLoading: bool,
};

const PageViewer = ({ page, setTitle, isLoading }: Props) => {
  if (!page.id) {
    return null;
  }

  let pageContents;
  if (isLoading) {
    pageContents = <Loading/>;
  } else if (page.pageType == pageTypes.none) {
    pageContents = <UploadPdf id={ page.id }/>;
  } else if (page.pageType == pageTypes.pdf) {
    if (!page.content || !page.content.pdf) {
      console.log('PageType is pdf but no contents returned.');
      pageContents = <Loading/>;
    }
    else {
      pageContents = (
        <PdfPageContainer
          id={ page.id }
          pdfBuffer={ page.content.pdf }
          highlights={ page.content.highlights }
        />
      );
    }
  }

  // let timeout = null;
  // let title = page.title;
  const TITLE_TIMEOUT = 500;
  return (
    <div>
      <input
        type='text'
        value={ page.title }
        onChange={ evt => {
          // TODO: set delay. currently the input value
          // does not update until after the timeout.
          // if (timeout) clearTimeout(timeout);
          // title = evt.target.value;
          // timeout = setTimeout(() => {
          //   setTitle(page.id, title);
          // }, TITLE_TIMEOUT);
          setTitle(page.id, evt.target.value);
        }}
      />
      <div>
        { pageContents }
      </div>
    </div>
  );
};

export default PageViewer;
