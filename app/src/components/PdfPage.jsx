// @flow

import React, { Component } from 'react';
import range from 'lodash/range';
import { PDFViewer, PDFLinkService } from "pdfjs-dist/web/pdf_viewer";
import highlightRange from 'dom-highlight-range';
import type { T_Highlight } from '../types';
import { nodeToHighlight, highlightToNode } from '../util';
import './pdf_viewer.css';

const clearContainer = (container: HTMLElement) => {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

type Props = {
  pdfDocument: any,
  highlights: Array<T_Highlight>,
  addHighlight: any
}

export default class PdfPage extends Component<Props> {

  componentDidUpdate() {

    const { pdfDocument, addHighlight } = this.props;
    if (!pdfDocument) {
      return;
    }

    this.linkService = new PDFLinkService();
      // enhanceTextSelection: true,
    this.viewer = new PDFViewer({
      container: this.container,
      removePageBorders: true,
      linkService: this.linkService
    });

    this.viewer.setDocument(pdfDocument);
    this.linkService.setDocument(pdfDocument);
    this.linkService.setViewer(this.viewer);

    document.addEventListener('mouseup', () => {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const startHighlight = nodeToHighlight(range.startContainer, range.startOffset);
      const endHighlight = nodeToHighlight(range.endContainer, range.endOffset);
      addHighlight(startHighlight, endHighlight);
      highlightRange(range, 'highlight');
    });
  }

  render() {
    const { pdfDocument } = this.props;
    if (!pdfDocument) {
      return (
        <div>No Document</div>
      )
    }

    return (
      <div ref={ node => this.container = node }>
        <div id='viewer'></div>
      </div>
    )
  }
}
