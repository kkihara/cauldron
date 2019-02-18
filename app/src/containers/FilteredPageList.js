// @flow

import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import PageList from '../components/PageList';
import { fetchPage } from '../actions/page';

const filterPages = state => {
  const { pageList, query } = state.pageList;
  if (query.length == 0 || !query.trim()) {
    return pageList.slice();
  }

  const fuseOptions = {
    caseSensitive: false,
    shouldSort: false,      // sort by score. maybe useful when reporting match score.
    tokenize: false,
    matchAllTokens: false,
    findAllMatches: false,
    includeScore: false,    // turn this on when able to display score.
    includeMatches: false,  // will include `indices`: [start, end]
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "title",
    ]
  };
  const fuse = new Fuse(pageList, fuseOptions);
  return fuse.search(query);
};

const mapStateToProps = state => ({
  pages: filterPages(state),
  currentId: state.currentPage.id,
});

const mapDispatchToProps = dispatch => ({
  setPage: (id: number) => dispatch(fetchPage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
