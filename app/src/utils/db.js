// @flow

import firebase from 'firebase/app';
import 'firebase/firestore';  // required
import config from './config';
import { pageTypes } from '../types';

const DEBUG = process.env.NODE_ENV == 'development';
const PAGES_COLLECTION = DEBUG ? 'test_pages' : 'pages';
const PDF_COLLECTION = DEBUG ? 'test_pdf' : 'pdf';

firebase.initializeApp({
  apiKey: "AIzaSyD-tvEcmriuuEt8akCBfQ0JHASQUc64a2Y",
  authDomain: "cauldron-27ea7.firebaseapp.com",
  databaseURL: "https://cauldron-27ea7.firebaseio.com",
  projectId: "cauldron-27ea7",
  storageBucket: "cauldron-27ea7.appspot.com",
  messagingSenderId: "245912371016",
  appId: "1:245912371016:web:b01e7a2b53d148fe"
});

const db = firebase.firestore();

/*
 * Page Collection
 */

export const insertPage = (
  pageType: T_PageTypes,
  created: number,
  title: string,
  callback: ((page: T_Page) => void) = page => {}
) => {
  db.collection(PAGES_COLLECTION).add({
    pageType,
    created,
    title,
    tags: [],
  }).then(ref => {
    console.log(ref);
    const page = {
      id: ref.id,
      pageType,
      created,
      title,
    };
    callback(page);
  }).catch(err => {
    console.error(err);
  });
};

export const deletePage = (
  id: string,
  callback: (() => void) = () => {}
) => {
  db.collection(PAGES_COLLECTION).doc(id).delete().then(ref => {
    callback();
  });
};

export const updateTitle = (
  id: string,
  title: string,
  callback: (() => void) = () => {}
) => {
  db.collection(PAGES_COLLECTION).doc(id).update({
    title,
  }).then(() => {
    callback();
  });
};

export const updatePageType = (
  id: string,
  pageType: T_PageTypes,
  callback: (() => void) = () => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).update({
    pageType,
  }).then(ref => {
    callback();
  });
};

export const getAllPages = (
  callback: (pageList: Array<T_Page>) => void = pageList => {},
) => {
  db.collection(PAGES_COLLECTION).get().then(querySnapshot => {
    const pageList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(pageList);
  })
};

export const loadPageById = (
  id: string,
  callback: (page: T_CurrentPage) => void = page => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).get().then(doc => {
    if (doc.exists) {
      const page = {
        id,
        ...doc.data(),
      }

      if (page.pageType == pageTypes.pdf) {
        db.collection(PAGES_COLLECTION).doc(id)
          .collection(PDF_COLLECTION).limit(1).get().then(querySnapshot => {
            querySnapshot.forEach(pdfDoc => {
              page.content = pdfDoc.data();
              callback(page);
            });
          });
      } else {
        callback(page);
      };
    } else {
      console.error('ID does not exist: ' + id);
    }
  });
};

/*
 * Tags
 */

export const insertTag = (
  id: string,
  tag: string,
  callback: ((tag: string) => void) = tag => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).update({
    tags: firebase.firestore.FieldValue.arrayUnion(tag),
  }).then(() => {
    callback(tag);
  });
};

export const deleteTag = (
  id: string,
  tag: string,
  callback: (() => void) = () => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).update({
    tags: firebase.firestore.FieldValue.arrayRemove(tag),
  }).then(() => {
    callback();
  });
};

export const getAllTagsByPageId = (
  id: number,
  callback: ((tagList: Array<string>) => void) = tagList => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).get().then(doc => {
    callback(doc.data().tags);
  });
};

/*
 * PDFs
 */

export const insertPdf = (
  id: string,
  pdf: Buffer,
  callback: (() => void) = () => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).collection(PDF_COLLECTION).add({
    highlights: '',
    pdf,
  }).then(ref => {
    callback();
  });
};

export const updateHighlights = (
  id: string,
  highlights: string,
  callback: (() => void) = () => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).collection(PDF_COLLECTION).update({
    highlights,
  }).then(ref => {
    callback();
  });
};
