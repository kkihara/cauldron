// @flow

import React from 'react';
import PdfPageContainer from '../containers/PdfPageContainer';
import UploadPdf from '../containers/UploadPdf';
import Loading from './Loading';
import { pageTypes } from '../types';
import type { T_CurrentPage } from '../types';

type Props = {
  ...T_CurrentPage,
  isLoading: bool,
};

const PageViewer = ({ isLoading, id, title, pageType, content }: Props) => {
  if (!id) return null;

  if (isLoading) {
    return <Loading/>;
  }

  if (pageType == pageTypes.none) {
    return <UploadPdf id={ id }/>;
  } else if (pageType == pageTypes.pdf) {
    if (!content || !content.pdf) {
      // throw new Error('PageType is pdf but no contents returned.');
      console.log('PageType is pdf but no contents returned.');
      return <Loading/>;
    }
    return <PdfPageContainer
      id={ id }
      pdfBuffer={ content.pdf }
      highlights={ content.highlights }/>;
  }
};

export default PageViewer;
