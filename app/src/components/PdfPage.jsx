// @flow

import React, { Component } from 'react';
import pdfjs from 'pdfjs-dist/webpack';
import {
  EventBus,
  PDFViewer,
  PDFLinkService } from "pdfjs-dist/web/pdf_viewer";
import rangy from 'rangy';
import 'rangy/lib/rangy-classapplier';
import 'rangy/lib/rangy-highlighter';
import 'rangy/lib/rangy-serializer';
import './pdf_viewer.css';
import PdfController from './PdfController';

// Do not change this. This is specific to pdfjs and rangy serialization.
const VIEWER_ID = 'viewer';

type Props = {
  id: number,
  pdfBuffer: string,
  highlights: string,
  updatePdfHighlight: any
};

export default class PdfPage extends Component<Props> {

  constructor(props: Props) {
    super(props);
    rangy.init();
    this.highlighter = rangy.createHighlighter();
    this.highlighter.addClassApplier(rangy.createClassApplier('highlight'));
    this.onMouseUp = this.onMouseUp.bind(this);
    this.renderPDF = this.renderPDF.bind(this);
  }

  renderPDF(pdfBuffer: string) {
    document.getElementById(VIEWER_ID).innerHTML = '';
    pdfjs.getDocument({data: pdfBuffer, disableFontFace: false}).then(pdfDocument => {
      this.eventBus = new EventBus();
        // enhanceTextSelection: true,
      this.viewer = new PDFViewer({
        container: this.container,
        removePageBorders: true,
        eventBus: this.eventBus,
      });

      this.viewer.setDocument(pdfDocument);

      this.container.addEventListener('mouseup', this.onMouseUp);

      // render highlights
      // this event will call renderhighlights for each page but
      // 'pagesloaded' event is too early :/
      this.eventBus.on('textlayerrendered', function() { this.renderHighlights() }.bind(this));
    });
  }

  onMouseUp(evt) {
    const { updatePdfHighlight } = this.props;
    if (evt.altKey) {
      this.highlighter.unhighlightSelection();
    } else {
      this.highlighter.highlightSelection('highlight', { containerElementId: VIEWER_ID });
    }
    updatePdfHighlight(this.highlighter.serialize());
  }

  renderHighlights() {
    const { highlights } = this.props;
    if (highlights !== '') {
      this.highlighter.removeAllHighlights();
      this.highlighter.deserialize(highlights);
    }
  }

  componentDidMount() {
    const { pdfBuffer } = this.props;
    this.renderPDF(pdfBuffer);
  }

  componentDidUpdate(prevProps) {
    const { id, pdfBuffer } = this.props;
    if (prevProps.id != id) {
      this.renderPDF(pdfBuffer);
    } else {
      this.renderHighlights();
    }
  }

  componentWillUnmount() {
    this.container.removeEventListener('mouseup', this.onMouseUp);
    this.eventBus.off('textlayerrendered', function() { this.renderHighlights() }.bind(this));
  }

  render() {
    return (
      <div ref={ node => this.container = node }>
        <div id={ VIEWER_ID }><PdfController/></div>
      </div>
    )
  }
}
