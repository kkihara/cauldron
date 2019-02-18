// @flow

import React from 'react';
import PdfPageContainer from '../containers/PdfPageContainer';
import DelayDispatchInput from '../components/DelayDispatchInput';
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

  return (
    <div>
      <DelayDispatchInput
        id='edit-page-title'
        initialValue={ (page.title) ? page.title : '' }
        placeholder=''
        timeoutLength={ 500 }
        dispatchFn={ (input: string) => (
          setTitle(page.id, input)
        )}
      />
      { pageContents }
    </div>
  );
};

export default PageViewer;
