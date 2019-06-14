// @flow

import { connect } from 'react-redux';
import { searchTags } from '../actions/page';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  id: 'search-tags',
  placeholder: 'Search Tags',
  query: state.pageList.tagQuery,
});

const mapDispatchToProps = dispatch => ({
  search: (query: string) => dispatch(searchTags(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
