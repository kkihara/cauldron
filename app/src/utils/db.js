// @flow

const { Database } = require('better-sqlite3');
// import Database from 'better-sqlite3';
import type { T_PageTypes, T_CurrentPage } from '../types';

const DB_PATH = './app_info.sqlite';
const PAGE_TABLE_NAME = 'page';
const TAG_TABLE_NAME = 'tag';
const PDF_TABLE_NAME = 'pdf';


const getDB = () => {
  const db = new Database(DB_PATH);

  db.prepare(`
    CREATE TABLE IF NOT EXISTS ${ PAGE_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageType TEXT NOT NULL,
      created INTEGER NOT NULL,
      title TEXT NOT NULL
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS ${ TAG_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pageId INTEGER NOT NULL,
      content TEXT NOT NULL,
      FOREIGN KEY(pageId) REFERENCES ${ PAGE_TABLE_NAME }(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    )
  `).run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS ${ PDF_TABLE_NAME }
    (
      id INTEGER PRIMARY KEY,
      highlights TEXT NOT NULL,
      content BLOB NOT NULL,
      FOREIGN KEY(id) REFERENCES ${ PAGE_TABLE_NAME }(id)
      ON DELETE CASCADE ON UPDATE CASCADE
    )
  `).run();

  return db;
};
const db = getDB();

/*
 * Page Table
 */
const insertPageStmt = db.prepare(`
  INSERT INTO ${ PAGE_TABLE_NAME } (pageType, created, title)
  VALUES (@pageType, @created, @title)
`);
export const insertPage = (pageType: T_PageTypes, created: number, title: string) => {
  const info = insertPageStmt.run({ pageType, created, title });
  return {
    id: info.lastInsertRowid,
    pageType,
    created,
    title,
  };
};

const updatePageStmt = db.prepare(`
  UPDATE ${ PAGE_TABLE_NAME }
  SET @col = @title
  WHERE id = @id
`);
export const updateTitle = (id: number, title: string) => {
  updatePageStmt.run({ id, title, col: 'title' });
};
export const updatePageType = (id: number, pageType: T_PageTypes) => {
  updatePageStmt.run({ id, pageType, col: 'pageType' });
};

const allPagesStmt = db.prepare(`
  SELECT * FROM ${ PAGE_TABLE_NAME }
`);
export const getAllPages = () => {
  return allPagesStmt.all();
};

/*
 * Tag Table
 */
const insertTagStmt = db.prepare(`
  INSERT INTO ${ TAG_TABLE_NAME } (pageId, content)
  VALUES (@pageId, @content)
`);
export const insertTag = (pageId: number, content: string) => {
  const info = insertTagStmt.run({ pageId, content });
  return {
    id: info.lastInsertRowid,
    pageId,
    content,
  };
};

const deleteTagStmt = db.prepare(`
  DELETE FROM ${ TAG_TABLE_NAME }
  WHERE id = @tagId and pageId = @pageId
`);
export const deleteTag = (pageId: number, tagId: number) => {
  deleteTagStmt.run({ pageId, tagId });
};

const allTagsStmt = db.prepare(`
  SELECT * FROM ${ TAG_TABLE_NAME }
  WHERE pageId = @pageId
`);
export const getAllTagsByPageId = (pageId: number) => {
  return allTagsStmt.all({ pageId });
};

/*
 * Pdf Table
 */
const insertPdfStmt = db.prepare(`
  INSERT INTO ${ PDF_TABLE_NAME } (id, highlighlights, content)
  VALUES (@pageId, @highlights, @content)
`);
export const insertPdf = (pageId: number, content: Buffer) => {
  insertPdfStmt.run({ pageId, content, higlights: '' });
};

const updateHighlightsStmt = db.prepare(`
  UPDATE ${ PDF_TABLE_NAME }
  SET higlights = @higlights
  WHERE id = @pageId
`);
export const updateHighlights = (pageId: number, highlights: string) => {
  updateHighlightsStmt.run({ pageId, highlights });
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
  WHERE ${ PAGE_TABLE_NAME }.id = @id
`);
export const loadPageById = (id: number): T_CurrentPage => {
  const info = loadPageStmt.run({ id });
  const page: T_CurrentPage = {
    id: info.id,
    title: info.title,
    pageType: info.pageType,
    content: null,
  };
  if (info.pdf) {
    page.content = {
      pdf: info.pdf,
      highlights: info.highlights,
    };
  }
  return page;
};
