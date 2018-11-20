// @flow

import type { T_HighlightNode } from './types';

export function nodeToHighlight(node: Node, offset: number): T_HighlightNode {
  const elem = node.parentElement;
  const pageAttribute = 'data-page-number';

  if (!elem) throw Error('Node does not have parentElement.');
  const pageElem = elem.closest('[' + pageAttribute + ']');
  if (!pageElem) throw Error('Node is not within in page.');
  const pageNum = pageElem.getAttribute(pageAttribute);
  if (!pageNum) throw Error('No page number.');

  const textLayer = pageElem.querySelector('.textLayer');
  if (!textLayer) throw Error('Page does not contain a textLayer.');
  const textDivs = Array.from(textLayer.querySelectorAll('div'));
  const divIdx = textDivs.indexOf(elem);
  if (divIdx < 0) throw Error('Node not in textLayer.');

  return { pageNum, divIdx, offset };
}

export function highlightToNode(highlight: T_HighlightNode): Node {
  const { pageNum, divIdx, offset } = highlight;
  const pageAttribute = 'data-page-number';

  const pageElem = document.querySelector('[' + pageAttribute + '="' + pageNum + '"]');
  if (!pageElem) throw Error('Cannot find page ' + pageNum);
  const textLayer = pageElem.querySelector('.textLayer');
  if (!textLayer) throw Error('Page does not contain a textLayer.');
  const textDiv = textLayer.querySelectorAll('div')[divIdx];

  // this assumes there is only text within a textDiv
  // highlights will add spans to this so need to be careful of that
  if (!textDiv.firstChild) throw Error('Empty text div.');
  return textDiv.firstChild;
}
