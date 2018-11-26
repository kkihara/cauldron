// @flow

import React from 'react';
import { PDFViewer, PDFLinkService } from "pdfjs-dist/web/pdf_viewer";
import './pdf_viewer.css';

const clearContainer = (container: HTMLElement) => {
  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }
}

type Props = {
  pdfDocument: string,
  highlights: string,
  container: HTMLDivElement,
  updatePdfHighlight: any
}

const PdfPage = ({ pdfDocument, highlights, container, updatePdfHighlight }: Props) => {
  let linkService = new PDFLinkService();
    // enhanceTextSelection: true,
  let viewer = new PDFViewer({
    container: container,
    removePageBorders: true,
    linkService: linkService
  });
  viewer.setDocument(pdfDocument);
  linkService.setDocument(pdfDocument);
  linkService.setViewer(viewer);

  container.addEventListener('mouseup', () => (
    console.log('mouse up!')
  ));

  return (
    <div id='viewer'/>
  );
};

export default PdfPage;

// export default class PdfPage extends Component<Props> {
//
//   componentDidUpdate() {
//
//     const { pdfDocument, addHighlight } = this.props;
//     if (!pdfDocument) {
//       return;
//     }
//
//     this.linkService = new PDFLinkService();
//       // enhanceTextSelection: true,
//     this.viewer = new PDFViewer({
//       container: this.container,
//       removePageBorders: true,
//       linkService: this.linkService
//     });
//
//     this.viewer.setDocument(pdfDocument);
//     this.linkService.setDocument(pdfDocument);
//     this.linkService.setViewer(this.viewer);
//
//     document.addEventListener('mouseup', () => {
//       const selection = window.getSelection();
//       const range = selection.getRangeAt(0);
//       const startHighlight = nodeToHighlight(range.startContainer, range.startOffset);
//       const endHighlight = nodeToHighlight(range.endContainer, range.endOffset);
//       addHighlight(startHighlight, endHighlight);
//       highlightRange(range, 'highlight');
//     });
//   }
//
//   render() {
//     const { pdfDocument } = this.props;
//     if (!pdfDocument) {
//       return (
//         <div>No Document</div>
//       )
//     }
//
//     return (
//       <div ref={ node => this.container = node }>
//         <div id='viewer'></div>
//       </div>
//     )
//   }
// }
