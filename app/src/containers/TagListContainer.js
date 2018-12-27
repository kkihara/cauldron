// @flow

import { connect } from 'react-redux';
import TagList from '../components/TagList';

const mapStateToProps = state => ({
  tags: state.currentPage.tagList.tagList
});

export default connect(mapStateToProps)(TagList);
