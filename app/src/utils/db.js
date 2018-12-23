// @flow

import PouchDB from 'pouchdb';

const DB_NAME = 'myapp';
export const pageDB = new PouchDB(DB_NAME + '-page');
export const tagDB = new PouchDB(DB_NAME + '-tag');
