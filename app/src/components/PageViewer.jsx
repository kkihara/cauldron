// @flow

import React from 'react';
import PdfPageContainer from '../containers/PdfPageContainer';
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
    // TODO: Upload PDF.
    return null;
  } else if (pageType == pageTypes.pdf) {
    let container = React.createRef();
    return (
      <div ref={ container }>
        <PdfPageContainer container={ container }/>
      </div>
    );
  } else {
    throw new Error('Unrecognized page type: ' + pageType);
  }
}

export default PageViewer;
