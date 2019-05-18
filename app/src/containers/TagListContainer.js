// @flow

import { connect } from 'react-redux';
import { appendToSearch } from '../actions/page';
import { deleteTag } from '../actions/tag';
import TagList from '../components/TagList';
import { viewTypes } from '../types';

const mapStateToProps = state => ({
  tags: state.tagList[state.currentPage.id] || [],
  isHome: state.currentView.value == viewTypes.home,
  pageId: state.currentPage.id,
});

const mapDispatchToProps = dispatch => ({
  searchTag: (tag: string) => dispatch(appendToSearch('#' + tag)),
  deleteTag: (pageId: string, tagId: string) => dispatch(deleteTag(pageId, tagId)),
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  tags: propsFromState.tags,
  isHome: propsFromState.isHome,
  searchTag: propsFromDispatch.searchTag,
  deleteTag: (tagId: string) => propsFromDispatch.deleteTag(propsFromState.pageId, tagId),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TagList);
