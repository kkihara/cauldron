// @flow

import { connect } from 'react-redux';
import { searchTags } from '../actions/page';
import SearchBar from '../components/SearchBar';
import SelectBar from '../components/SelectBar';

const tagListToOptions = tagList => {
  const tags = [].concat.apply([], Object.values(tagList)); // flatten lists
  const uniqueTags = [...new Set(tags.map(t => t.content))];
  const ret = uniqueTags.map(t => ({ label: t }));
  console.log(ret);
  return ret;
};

const mapStateToProps = state => ({
  id: 'search-tags',
  placeholder: 'Search Tags',
  options: tagListToOptions(state.tagList),
  query: state.pageList.tagQuery,
});

const mapDispatchToProps = dispatch => ({
  search: (query: string) => dispatch(searchTags(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectBar);
