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

export default class PdfPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      highlights: []
    };
  }

  highlightTransform(
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
  ) {
    return (
      <div>Hello</div>
    )
  }

  onScrollChange() {
    return
  }

  scrollRef(scrollTo: (highlight: T_Highlight) => void) {
    return
  }

  onSelectionFinished(
      position: T_ScaledPosition,
      content: { text?: string, image?: string },
      hideTipAndSelection: () => void,
      transformSelection: () => void
  ) {
    return (
      <div>Selection Finished!</div>
    )
  }

  enableAreaSelection(event: MouseEvent) {
    return event.altKey;
  }

  renderPdf(pdfDocument: T_PDFJS_Document) {
    return (
      <PdfHighlighter
        pdfDocument={ pdfDocument }
        highlights={ this.state.highlights }
        highlightTransform={ (i0, i1, i2, i3, i4, i5, i6) =>
          this.highlightTransform(i0, i1, i2, i3, i4, i5, i6)
        }
        onScrollChange={ () => this.onScrollChange() }
        scrollRef={ (scrollTo) => this.scrollRef(scrollTo) }
        onSelectionFinished={ (i0, i1, i2, i3) =>
          this.onSelectionFinished(i0, i1, i2, i3) }
        enableAreaSelection={ (event) => this.enableAreaSelection(event) }
      />
    )
  }

  render() {
    console.log('path' + this.props.path)
    if (this.props.path !== '') {
      return (
        <PdfLoader url={ this.props.path } beforeLoad={ <div>Loading...</div> }>
          { pdfDocument => this.renderPdf(pdfDocument) }
        </PdfLoader>
      )
    } else {
      return (
        <div>Upload a file</div>
      )
    }
  }
}
