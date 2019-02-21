// @flow

import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import PageList from '../components/PageList';
import { fetchPage } from '../actions/page';

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

const filterPages = state => {
  const { pageList, query } = state.pageList;
  const tagList = state.tagList;

  if (query.length == 0 || !query.trim()) {
    return pageList.slice();
  }

  const tagQuerys = query.split(' ').filter(
    word => word.startsWith('#')
  ).map(
    tag => tag.slice(1)
  );

  const queryList = pageList.filter(
    page => tagQuerys.every(
      searchTag => tagList[page.id].some(
        pageTag => pageTag.content == searchTag
      )
    )
  );

  const searchQuery = query.split(' ').filter(
    word => !word.startsWith('#')
  ).join(' ');

  if (searchQuery.length == 0 || !searchQuery.trim()) {
    return queryList;
  }
  const fuse = new Fuse(queryList, fuseOptions);
  return fuse.search(searchQuery);
};

const mapStateToProps = state => ({
  pages: filterPages(state),
  currentId: state.currentPage.id,
});

const mapDispatchToProps = dispatch => ({
  setPage: (id: number) => dispatch(fetchPage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
