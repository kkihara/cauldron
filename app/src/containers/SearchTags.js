// @flow

import { connect } from 'react-redux';
import { searchTags } from '../actions/page';
import SearchBar from '../components/SearchBar';
import SelectBar from '../components/SelectBar';

const pageListToOptions = pageList => {
  const tags = [];
  pageList.forEach(page => {
    if (page.tags) {
      tags.push(...page.tags);
    }
  });
  const uniqueTags = [...new Set(tags)];
  return uniqueTags.map(t => ({ label: t, value: t }));
};

const mapStateToProps = state => ({
  id: 'search-tags',
  placeholder: 'Search Tags',
  options: pageListToOptions(state.pageList.pageList),
  query: state.pageList.tagQuery,
});

const mapDispatchToProps = dispatch => ({
  search: (query: string) => dispatch(searchTags(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBar);
