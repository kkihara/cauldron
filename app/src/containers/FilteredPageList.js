// @flow

import Fuse from 'fuse.js';
import { connect } from 'react-redux';
import PageList from '../components/PageList';
import { fetchPage, toggleSort, pushSortColumn } from '../actions/page';

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
  const { pageList, query, tagQuery, columnCompare, columnSort } = state.pageList;

  const compare = (a, b) => {
    for (const column of columnSort) {
      const val = columnCompare[column](a[column], b[column]);
      console.log(column, val);
      if (val < 0) return -1;
      if (val > 0) return 1;
    }
    return 0;
  };

  const tags = tagQuery || [];

  const filteredPages = pageList.filter(
    page => tags.every(
      searchTag => page.tags.some(
        pageTag => pageTag == searchTag.value
      )
    )
  );

  if (query.length == 0 || !query.trim()) {
    const result = filteredPages.slice();
    result.sort(compare);
    return result;
  }

  const fuse = new Fuse(filteredPages, fuseOptions);
  const queriedPages = fuse.search(query);

  const sortedPages = queriedPages.sort(compare);
  return sortedPages;
};

const mapStateToProps = state => ({
  pages: filterPages(state),
  currentId: state.currentPage.id,
});

const mapDispatchToProps = dispatch => ({
  setPage: (id: number) => dispatch(fetchPage(id)),
  toggleColumn: (column: string) => {
    dispatch(toggleSort(column));
    dispatch(pushSortColumn(column));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
