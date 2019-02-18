// @flow

/*
 * TODO: ERROR IF INSERT RETURNS ERR OR NULL ID
 */
const sqlite3 = require('sqlite3').verbose();
import { remote } from 'electron';
import path from 'path';
import config from './config';
import type { T_Page, T_PageTypes, T_CurrentPage, T_Tag } from '../types';

const PROD_PATH = config.dbPath;
const DEV_PATH = ':memory:';
const DB_PATH = process.env.NODE_ENV == 'development' ? DEV_PATH : PROD_PATH;
const PAGE_TABLE_NAME = 'page';
const TAG_TABLE_NAME = 'tag';
const PDF_TABLE_NAME = 'pdf';


const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ${ PAGE_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageType TEXT NOT NULL,
      created INTEGER NOT NULL,
      title TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS ${ TAG_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageId INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY(pageId) REFERENCES ${ PAGE_TABLE_NAME }(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS ${ PDF_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY,
      highlights TEXT NOT NULL,
      content BLOB NOT NULL,
      FOREIGN KEY(id) REFERENCES ${ PAGE_TABLE_NAME }(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    )
  `);
});

/*
 * Page Table
 */
const insertPageStmt = db.prepare(`
  INSERT INTO ${ PAGE_TABLE_NAME }(pageType, created, title)
  VALUES ($pageType, $created, $title)
`);
export const insertPage = (
  $pageType: T_PageTypes,
  $created: number,
  $title: string,
  callback: ((page: T_Page) => void) = page => {}
) => {
  const resultToPage = result => ({
    id: result.lastID,
    pageType: $pageType,
    created: $created,
    title: $title,
  });
  insertPageStmt.run({ $pageType, $created, $title }, function(err) {
    if (err) {
      return console.log(err);
    }
    const page = resultToPage(this);
    callback(page);
  });
};

const deletePageStmt = db.prepare(`
  DELETE FROM ${ PAGE_TABLE_NAME }
  WHERE id = $id
`);
export const deletePage = (
  $id: number,
  callback: (() => void) = () => {}
) => {
  deletePageStmt.run({ $id }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

const updateTitleStmt = db.prepare(`
  UPDATE ${ PAGE_TABLE_NAME }
  SET title = $title
  WHERE id = $id
`);
export const updateTitle = (
  $id: number,
  $title: string,
  callback: (() => void) = () => {}
) => {
  updateTitleStmt.run({ $id, $title }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

const updatePageTypeStmt = db.prepare(`
  UPDATE ${ PAGE_TABLE_NAME }
  SET pageType = $pageType
  WHERE id = $id
`);
export const updatePageType = (
  $id: number,
  $pageType: T_PageTypes,
  callback: (() => void) = () => {},
) => {
  updatePageTypeStmt.run({ $id, $pageType }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

const allPagesStmt = db.prepare(`
  SELECT * FROM ${ PAGE_TABLE_NAME }
`);
export const getAllPages = (
  callback: (pageList: Array<T_Page>) => void = pageList => {},
) => {
  allPagesStmt.all([], (err, rows) => {
    if (err) {
      return console.log(err);
    }
    callback(rows);
  });
};

/*
 * Tag Table
 */
const insertTagStmt = db.prepare(`
  INSERT INTO ${ TAG_TABLE_NAME } (pageId, content)
  VALUES ($pageId, $content)
`);
export const insertTag = (
  $pageId: number,
  $content: string,
  callback: ((tag: T_Tag) => void) = tag => {},
) => {
  const resultToTag = result => ({
    id: result.lastID,
    pageId: $pageId,
    content: $content,
  });
  insertTagStmt.run({ $pageId, $content }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback(resultToTag(this));
  });
};

const deleteTagStmt = db.prepare(`
  DELETE FROM ${ TAG_TABLE_NAME }
  WHERE id = $tagId and pageId = $pageId
`);
export const deleteTag = (
  $pageId: number,
  $tagId: number,
  callback: (() => void) = () => {},
) => {
  deleteTagStmt.run({ $pageId, $tagId }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

const tagsByPageStmt = db.prepare(`
  SELECT * FROM ${ TAG_TABLE_NAME }
  WHERE pageId = $pageId
`);
export const getAllTagsByPageId = (
  $pageId: number,
  callback: ((tagList: Array<T_Tag>) => void) = tagList => {},
) => {
  tagsByPageStmt.all({ $pageId }, (err, rows) => {
    if (err) {
      return console.log(err);
    }
    callback(rows);
  });
};

const allTagsStmt = db.prepare(`
  SELECT * FROM ${ TAG_TABLE_NAME }
`);
export const getAllTags = (
  callback: ((allTags: { [id: number]: Array<T_Tag> }) => void) = allTags => {},
) => {
  allTagsStmt.all({}, (err, rows) => {
    if (err) {
      return console.log(err);
    }
    const allTags = {};
    rows.map(row => {
      allTags[row.pageId] = row;
    });
    callback(allTags);
  })
};

/*
 * Pdf Table
 */
const insertPdfStmt = db.prepare(`
  INSERT INTO ${ PDF_TABLE_NAME } (id, highlights, content)
  VALUES ($pageId, $highlights, $content)
`);
export const insertPdf = (
  $pageId: number,
  $content: Buffer,
  callback: (() => void) = () => {},
) => {
  insertPdfStmt.run({ $pageId, $content, $highlights: '' }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

const updateHighlightsStmt = db.prepare(`
  UPDATE ${ PDF_TABLE_NAME }
  SET highlights = $highlights
  WHERE id = $pageId
`);
export const updateHighlights = (
  $pageId: number,
  $highlights: string,
  callback: (() => void) = () => {},
) => {
  updateHighlightsStmt.run({ $pageId, $highlights }, function(err) {
    if (err) {
      return console.log(err);
    }
    callback();
  });
};

/*
 * Current Page
 */
const loadPageStmt = db.prepare(`
  SELECT
    ${ PAGE_TABLE_NAME }.id,
    title,
    pageType,
    ${ PDF_TABLE_NAME }.content as pdf,
    highlights
  FROM ${ PAGE_TABLE_NAME }
  LEFT JOIN ${ PDF_TABLE_NAME }
  ON ${ PAGE_TABLE_NAME }.id = ${ PDF_TABLE_NAME }.id
  WHERE ${ PAGE_TABLE_NAME }.id = $id
`);
export const loadPageById = (
  id: number,
  callback: (page: T_CurrentPage) => void = page => {},
) => {
  const resultToCurrentPage = result => {
    const page: T_CurrentPage = {
      id: result.id,
      title: result.title,
      pageType: result.pageType,
      content: null,
    };
    if (result.pdf) {
      page.content = {
        pdf: result.pdf,
        highlights: result.highlights,
      };
    }
    return page;
  };

  loadPageStmt.get({ $id: id }, (err, row) => {
    if (err) {
      return console.log(err);
    }
    callback(resultToCurrentPage(row));
  });
};
