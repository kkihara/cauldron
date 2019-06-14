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
  const { pageList, query, tagQuery } = state.pageList;
  const tagList = state.tagList;

  const tagQuerys = tagQuery.split(' ').filter(
    word => word.startsWith('#')
  ).map(
    tag => tag.slice(1)
  );

  const filteredPages = pageList.filter(
    page => tagQuerys.every(
      searchTag => tagList[page.id].some(
        pageTag => pageTag.content == searchTag
      )
    )
  );

  if (query.length == 0 || !query.trim()) {
    return filteredPages.slice();
  }

  const fuse = new Fuse(filteredPages, fuseOptions);
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
