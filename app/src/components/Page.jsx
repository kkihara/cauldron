// @flow

import React from 'react';

export type PageProps = {
  id: string,
  title: string,
  created: string
};

const Page = ({ id, title, created }: PageProps) => (
  <li>
    { created } | { title }
  </li>
);

export default Page;
