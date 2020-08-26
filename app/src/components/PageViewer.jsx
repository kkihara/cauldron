// @flow

import React from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
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

const StickyDiv = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
`;

const EditPageTable = styled(DelayDispatchInput)`
  width: 100%;
  padding: 6px 10px;
  margin: 0 0 10px 0;
  font-size: 15px;
  font-family: sans-serif;
`;

const Toolbar = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 2px solid;
  opacity: 1.0;
  background-color: rgb(255,255,255);
`;

const ZoomDiv = styled.div`
  width: 15%;
  position: relative; 
  left: 50%;
  transform: translateX(-50%);
`;

const PageViewer = ({ page, view, setTitle, isLoading, setZoom }: Props) => {

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
        console.error('PageType is pdf but no contents returned.');
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
        <StickyDiv>
          <EditPageTable
            id='edit-page-title'
            initialValue={ (page.title) ? page.title : '' }
            placeholder=''
            timeoutLength={ 500 }
            dispatchFn={ (input: string) => (
              setTitle(page.id, input)
            )}
          />
          <Toolbar>
            <ZoomDiv>
              Zoom:
              <Slider
                defaultValue={50}
                onChange={ (event, newValue) => (
                  setZoom(newValue)
                )}
              />
            </ZoomDiv>
          </Toolbar>
        </StickyDiv>
        { pageContents }
      </div>
    );
  }
};

export default PageViewer;
