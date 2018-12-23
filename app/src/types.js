// @flow

export type T_Page = {
  _id: string,
  pageType: string,
  created: number,
  title: string,
  highlights: ?string,
}

export type T_Tag = {
  _id: string,
  pageId: string,
  value: string,
}

export const pageTypes = {
  pdf: 'pdf',
  none: 'none'
};

export type T_PageTypes = $Keys<typeof pageTypes>;
