// @flow

import pdfjs from 'pdfjs-dist/webpack';
import { ipcRenderer, remote } from 'electron';
import firebase from 'firebase/app';
import 'firebase/auth';    // required
import 'firebase/firestore';  // required
import 'firebase/storage';    // required
import { pageTypes } from '../types';
import { restoreState } from '.';
const config = remote.require('./config');

const DEBUG = process.env.NODE_ENV == 'development';
const PAGES_COLLECTION = DEBUG ? 'test_pages' : 'pages';

firebase.initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
});

firebase.auth().signInWithEmailAndPassword(config.email, config.password).catch(err => console.log(err));
firebase.auth().onAuthStateChanged(user => {
  if (user) {  // user signed in
    restoreState();
  } else {     // user signed out

  }
});

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

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
    const page = {
      id: ref.id,
      tags: [],
      pageType,
      created,
      title,
    };
    callback(page);
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
  console.log('loading page id', id);
  db.collection(PAGES_COLLECTION).doc(id).get().then(doc => {
    if (doc.exists) {
      const page = {
        id,
        ...doc.data(),
      }
      console.log('loading page', page);

      if (page.pageType == pageTypes.pdf) {
        console.log('loading PDF');
        ipcRenderer.send('maybe-download', { pdfPath: page.pdfPath });
        ipcRenderer.once('download-complete', (event, fullPdfPath) => {
          pdfjs.getDocument(fullPdfPath).then(pdfDocument => {
            return pdfDocument.getData();
          }).then(pdfData => {
            page.content = {
              pdf: pdfData,
              highlights: page.highlights,
            };
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
  id: string,
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
  buffer: Buffer,
  callback: (() => void) = () => {},
) => {
  const fileRef = storageRef.child('pdfs/' + id + '.pdf');
  fileRef.put(buffer).then(snapshot => {
    db.collection(PAGES_COLLECTION).doc(id).update({
      pdfPath: snapshot.ref.fullPath,
      highlights: '',
      pageType: pageTypes.pdf,
    });
  });
};

export const updateHighlights = (
  id: string,
  highlights: string,
  callback: (() => void) = () => {},
) => {
  db.collection(PAGES_COLLECTION).doc(id).update({
    highlights,
  }).then(ref => {
    callback();
  });
};
