// @flow

import React, { Component } from 'react';
import { PDFViewer, PDFLinkService } from "pdfjs-dist/web/pdf_viewer";
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-serializer';
import './pdf_viewer.css';

const clearContainer = (container: HTMLElement) => {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

type Props = {
  pdfDocument: string,
  highlights: string,
  updatePdfHighlight: any
}

// const PdfPage = ({ pdfDocument, highlights, container, updatePdfHighlight }: Props) => {
//   console.log('Rendering PdfPage');
//   console.log(container);
//   let linkService = new PDFLinkService();
//     // enhanceTextSelection: true,
//   let viewer = new PDFViewer({
//     container: container,
//     removePageBorders: true,
//     linkService: linkService
//   });
//   viewer.setDocument(pdfDocument);
//   linkService.setDocument(pdfDocument);
//   linkService.setViewer(viewer);
// 
//   console.log('Done setting pdf document');
//   document.addEventListener('mouseup', () => {
//     console.log('mouse up!')
//   });
// };
// 
// export default PdfPage;

export default class PdfPage extends Component<Props> {

  componentDidMount() {
    console.log('mount pdf page');
    const { pdfDocument, highlights, updatePdfHighlight } = this.props;

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

  rangy.init();

    // let applier = rangy.createClassApplier('highlight');
    this.highlighter = rangy.createHighlighter();
    this.highlighter.addClassApplier(rangy.createClassApplier('highlight'));

    document.addEventListener('mouseup', () => {
      console.log('mouse up!');
      this.highlighter.highlightSelection('highlight');
      console.log(updatePdfHighlight.toString());
      updatePdfHighlight(this.highlighter.serialize());
    });

  }

  componentDidUpdate() {
    const { highlights } = this.props;
    this.highlighter.removeAllHighlights();
    this.highlighter.deserialize(highlights.encoded);
  }

  render() {
    return (
      <div ref={ node => this.container = node }>
        <div id='viewer'></div>
      </div>
    )
  }
}
