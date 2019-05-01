// @flow

import React from 'react';
import styled from 'styled-components';
import PdfPageContainer from '../containers/PdfPageContainer';
import DelayDispatchInput from '../components/DelayDispatchInput';
import UploadPdf from '../containers/UploadPdf';
import Loading from './Loading';
import { pageTypes, viewTypes } from '../types';
import type { T_CurrentPage, T_CurrentView } from '../types';

type Props = {
  page: T_CurrentPage,
  view: T_CurrentView,
  setTitle: any,
  isLoading: bool,
};

const EditPageTable = styled(DelayDispatchInput)`
  width: 100%;
  padding: 6px 10px;
  margin: 0 0 10px 0;
  font-size: 15px;
  font-family: sans-serif;
`;

const PageViewer = ({ page, view, setTitle, isLoading }: Props) => {

  /*
   * Arxiv View
   */
  if (view == viewTypes.arxiv) {
    console.log('ARXIV VIEW');
    return null;
  }
  /*
   * Home View
   */
  else {
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
        <EditPageTable
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
  }
};

export default PageViewer;
