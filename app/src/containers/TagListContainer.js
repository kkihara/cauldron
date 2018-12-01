// @flow

import { connect } from 'react-redux';
import TagList from '../components/TagList';

const getCurrentTagList = state => {
  if (state.currentPage && state.currentPage.id) {
    return state.tagsById[state.currentPage.id] || [];
  }
  return [];
}

const mapStateToProps = state => ({
  tags: getCurrentTagList(state)
});

export default connect(mapStateToProps)(TagList);
