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
      // <div ref={ container }>
      //   <div id='viewer'>
      //     <PdfPageContainer container={ container }/>
      //   </div>
      // </div>
    if (!content || !content.pdf) {
      throw new Error('PageType is pdf but no contents returned.');
    }
    return <PdfPageContainer
      id={ id }
      pdf={ content.pdf }
      highlights={ content.highlights }/>;
  }
};

export default PageViewer;
