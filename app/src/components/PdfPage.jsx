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

type Props = {
  pdfBuffer: string,
  highlights: string,
  updatePdfHighlight: any
};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export default class PdfPage extends Component<Props> {

  constructor(props: Props) {
    super(props);
    rangy.init();
    this.highlighter = rangy.createHighlighter();
    this.highlighter.addClassApplier(rangy.createClassApplier('highlight'));
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  onMouseUp(evt) {
    const { updatePdfHighlight } = this.props;
    if (evt.altKey) {
      this.highlighter.unhighlightSelection();
    } else {
      this.highlighter.highlightSelection('highlight');
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
    const { pdfBuffer, highlights } = this.props;
    pdfjs.getDocument(pdfBuffer).then(pdfDocument => {
      this.eventBus = new EventBus();
        // enhanceTextSelection: true,
      this.viewer = new PDFViewer({
        container: this.container,
        removePageBorders: true,
        eventBus: this.eventBus
      });

      this.viewer.setDocument(pdfDocument);

      this.container.addEventListener('mouseup', this.onMouseUp);

      // render highlights
      // this event will call renderhighlights for each page but
      // 'pagesloaded' event is too early :/
      this.eventBus.on('textlayerrendered', function() { this.renderHighlights() }.bind(this));
    });
  }

  componentDidUpdate() {
    this.renderHighlights();
  }

  componentWillUnmount() {
    this.container.removeEventListener('mouseup', this.onMouseUp);
    this.eventBus.off('textlayerrendered', function() { this.renderHighlights() }.bind(this));
  }

  render() {
    return (
      <div ref={ node => this.container = node }>
        <div id='viewer'><PdfController/></div>
      </div>
    )
  }
}
