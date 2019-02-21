// @flow

import { connect } from 'react-redux';
import { searchPages } from '../actions/page';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  query: state.pageList.query,
});

const mapDispatchToProps = dispatch => ({
  search: (input: string) => dispatch(searchPages(input))
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
