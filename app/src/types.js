// @flow

export type T_PageSelector = {
  id: string,
  title: string,
  created: string
};

export type T_HighlightNode = {
  pageNum: string,
  divIdx: number,
  offset: number
}

export type T_Highlight = {
  id: string,
  startNode: T_HighlightNode,
  endNode: T_HighlightNode
}
