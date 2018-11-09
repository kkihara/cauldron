// @flow

import React, { Component } from 'react';
import { PdfLoader, PdfHighlighter } from 'react-pdf-highlighter';

// TODO: move this to types module -----------------
export type T_LTWH = {
  left: number,
  top: number,
  width: number,
  height: number
};

export type T_Scaled = {
  x1: number,
  y1: number,

  x2: number,
  y2: number,

  width: number,
  height: number
};

export type T_Position = {
  boundingRect: T_LTWH,
  rects: Array<T_LTWH>,
  pageNumber: number
};

export type T_ScaledPosition = {
  boundingRect: T_Scaled,
  rects: Array<T_Scaled>,
  pageNumber: number,
  usePdfCoordinates?: boolean
};

export type T_NewHighlight = {
  position: T_ScaledPosition,
  content: {
    text?: string,
    image?: string
  },
  comment: {
    text: string,
    emoji: string
  }
};

export type T_Highlight = { id: string } & T_NewHighlight;

export type T_ViewportHighlight = { position: T_Position } & T_Highlight;

export type T_VIEWPORT = {
  convertToPdfPoint: (x: number, y: number) => Array<number>,
  convertToViewportRectangle: (pdfRectangle: Array<number>) => Array<number>,
  width: number,
  height: number
};

export type T_PDFJS_Viewer = {
  container: HTMLDivElement,
  viewer: HTMLDivElement,
  getPageView: (
    page: number
  ) => {
    textLayer: { textLayerDiv: HTMLDivElement },
    viewport: T_VIEWPORT,
    div: HTMLDivElement,
    canvas: HTMLCanvasElement
  },
  setDocument: (document: T_PDFJS_Document) => Promise<void>,
  scrollPageIntoView: (options: {
    pageNumber: number,
    destArray: Array<mixed>
  }) => void,
  currentScaleValue: string
};

export type T_PDFJS_Document = {
  numPages: number
};

export type T_PDFJS_LinkService = {
  setDocument: (document: Object) => void,
  setViewer: (viewer: T_PDFJS_Viewer) => void
};

export type T_PDFJS = {
  TextLayerBuilder: {
    prototype: {
      _bindMouse: () => void
    }
  },
  PDFViewer: (options: Object) => T_PDFJS_Viewer,
  PDFLinkService: () => T_PDFJS_LinkService,
  getDocument: (url: string) => Promise<T_PDFJS_Document>,
  disableWorker: boolean
};
// End Types ---------------------------------------------------------

type Props = {
  path: string,
};
type State = {
  highlights: Array<T_Highlight>,
};

const highlightTransform = (
    highlight: T_ViewportHighlight,
    index: number,
    setTip: (
      highlight: T_ViewportHighlight,
      callback: (highlight: T_ViewportHighlight) => React$Element<*>
    ) => void,
    hideTip: () => void,
    viewportToScaled: (rect: T_LTWH) => T_Scaled,
    screenshot: (position: T_LTWH) => string,
    isScrolledTo: boolean
) => (
    <div>Hello</div>
)

const onScrollChange = () => undefined;

const scrollRef = (scrollTo: (highlight: T_Highlight) => void) => undefined;

const enableAreaSelection = (event: MouseEvent) => event.altKey;

const PdfPage = ({ highlights, addHighlight }: any) => {
  const onSelectionFinished = (
      position: T_ScaledPosition,
      content: { text?: string, image?: string },
      hideTipAndSelection: () => void,
      transformSelection: () => void
  ) => {
    addHighlight(position);
    return (<div>ADD HIGHLIGHT</div>);
  };

  return (
    <PdfLoader url={ '/Users/panda/Downloads/1512.03385.pdf' } beforeLoad={ <div>Loading...</div> }>
    { pdfDocument => (
      <PdfHighlighter
        pdfDocument={ pdfDocument }
        highlights={ highlights }
        highlightTransform={ (i0, i1, i2, i3, i4, i5, i6) =>
          highlightTransform(i0, i1, i2, i3, i4, i5, i6)
        }
        onScrollChange={ () => onScrollChange() }
        scrollRef={ (scrollTo) => scrollRef(scrollTo) }
        onSelectionFinished={ (i0, i1, i2, i3) =>
          onSelectionFinished(i0, i1, i2, i3) }
        enableAreaSelection={ (event) => enableAreaSelection(event) }
      />
    )}
    </PdfLoader>
  )
}

export default PdfPage;
