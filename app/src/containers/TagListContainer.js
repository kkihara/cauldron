// @flow

import { connect } from 'react-redux';
import { appendToSearch } from '../actions/page';
import TagList from '../components/TagList';
import { viewTypes } from '../types';

const mapStateToProps = state => ({
  tags: state.tagList[state.currentPage.id] || [],
  isHome: state.currentView.value == viewTypes.home,
});

const mapDispatchToProps = dispatch => ({
  searchTag: (tag: string) => dispatch(appendToSearch('#' + tag))
})

export default connect(mapStateToProps, mapDispatchToProps)(TagList);
