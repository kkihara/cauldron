// @flow

import React from 'react';
import PdfPageContainer from '../containers/PdfPageContainer';
import UploadPdf from '../containers/UploadPdf';
import Loading from './Loading';
import { pageTypes, progressTypes } from '../types';
import type { T_CurrentPage } from '../types';

type Props = {
  currentPage: T_CurrentPage
}

const PageViewer = ({ currentPage }: Props) => {
  if (!currentPage) return null;

  const { id, progress, pageType, contents } = currentPage;
  if (progress == progressTypes.loading) {
    return <Loading/>;
  } else if (progress != progressTypes.done) {
    // TODO: what should happen on unrecognized progress type?
    throw new Error('Unrecognized progress type: ' + progress);
  }

  // progress == done
  if (pageType == pageTypes.none) {
    return <UploadPdf id={ id }/>;
  } else if (pageType == pageTypes.pdf) {
      // <div ref={ container }>
      //   <div id='viewer'>
      //     <PdfPageContainer container={ container }/>
      //   </div>
      // </div>
    return <PdfPageContainer id={ id } pdfDocument={ contents.pdfDocument }/>;
  } else {
    throw new Error('Unrecognized page type: ' + pageType);
  }
}

export default PageViewer;
