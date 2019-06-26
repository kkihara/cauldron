// @flow

export type T_Page = {
  id: number,
  pageType: T_PageTypes,
  created: number,
  title: string,
  tags: Array<string>,
};

export type T_Tag = {
  id: number,
  pageId: number,
  content: string,
};

export type T_PdfContent = {
  pdf: Buffer,
  highlights: string,
}

export type T_CurrentPage = {
  id: ?number,
  title: ?string,
  pageType: T_PageTypes,
  content: ?T_PdfContent,
};

export const pageTypes = {
  pdf: 'pdf',
  none: 'none',
};

export type T_PageTypes = $Keys<typeof pageTypes>;

export const viewTypes = {
  home: 'home',
  arxiv: 'arxiv',
};

export type T_ViewTypes = $Keys<typeof viewTypes>;

export type T_CurrentView = {
  value: T_ViewTypes,
};
