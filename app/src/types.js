// @flow

export type T_Page = {
  id: string,
  pageType: string,
  created: string,
  title: string
};

export type T_PagesById = {
  [page_id: string]: T_Page
};

export type T_TagsById = {
  [page_id: string]: Array<string>
};

export type T_Highlight = {
  id: string,
  encoded: string
};

export type T_HighlightsById = {
  [page_id: string]: T_Highlight
}

export type T_PdfPath = {
  id: string,
  path: string
};

export type T_PdfPathsById = {
  [page_id: string]: T_PdfPath
};

export const pageTypes = {
  pdf: 'pdf',
  none: 'none'
};

export type T_PageTypes = $Keys<typeof pageTypes>;

export const progressTypes = {
  loading: 'loading',
  done: 'done'
};

export type T_ProgressTypes = $Keys<typeof progressTypes>;

// TODO: can type pageType with contents together
export type T_CurrentPage = {
  id: string,
  progress: T_ProgressTypes,
  pageType: T_PageTypes,
  contents: {
    pdfDocument?: string
  }
};
