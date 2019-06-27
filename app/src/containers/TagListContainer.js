// @flow

import { connect } from 'react-redux';
import { appendToTagSearch } from '../actions/page';
import { deleteTag } from '../actions/tag';
import TagList from '../components/TagList';
import { viewTypes } from '../types';

const mapStateToProps = state => {
  let tags = [];
  const page = state.pageList.pageList.find(page => page.id == state.currentPage.id);
  if (page) {
    tags = page.tags;
  }
  return {
    tags: tags,
    isHome: state.currentView.value == viewTypes.home,
    pageId: state.currentPage.id,
  };
};

const mapDispatchToProps = dispatch => ({
  searchTag: (tag: string) => dispatch(appendToTagSearch(tag)),
  deleteTag: (pageId: string, tag: string) => dispatch(deleteTag(pageId, tag)),
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  tags: propsFromState.tags,
  isHome: propsFromState.isHome,
  searchTag: propsFromDispatch.searchTag,
  deleteTag: (tag: string) => propsFromDispatch.deleteTag(propsFromState.pageId, tag),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(TagList);
