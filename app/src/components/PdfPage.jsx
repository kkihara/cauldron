// @flow

import React, { Component } from 'react';
import range from 'lodash/range';
import { PDFViewer, PDFLinkService } from "pdfjs-dist/web/pdf_viewer";

const clearContainer = (container: HTMLElement) => {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

type Props = {
  pdfDocument: any,
  highlights: Array<any>,
  addHighlight: any
}

export default class PdfPage extends Component<Props> {

  componentDidUpdate() {
    console.log('COMPONENTDIDUPDATE');

    const { pdfDocument } = this.props;
    if (!pdfDocument) {
      console.log('NO PDF DOCUMENT');
      return;
    }

    console.log('COMPONENT MOUNT PDFVIEWER');

    if (!this.container) console.log('NULL CONTAINER');

    this.linkService = new PDFLinkService();
      // enhanceTextSelection: true,
      // removePageBorders: true,
    this.viewer = new PDFViewer({
      container: this.container,
      linkService: this.linkService
    });

    this.viewer.setDocument(pdfDocument);
    this.linkService.setDocument(pdfDocument);
    this.linkService.setViewer(this.viewer);
  }

  // connectedComponent =>
  // this.container = connectedComponent.getWrappedInstance()
  render() {
    console.log('RENDER PDF');
    const { pdfDocument } = this.props;
    if (!pdfDocument) {
    console.log('pdfpage no doc');
      return (
        <div>No Document</div>
      )
    }

    console.log('RETURNING FROM RENDER');
    return (
      <div ref={ node => this.container = node }>
        <div id='viewer'></div>
      </div>
    )
  }
}
