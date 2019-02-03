// @flow

import { connect } from 'react-redux';
import TagList from '../components/TagList';

const mapStateToProps = state => ({
  tags: state.tagList[state.currentPage.id] || []
});

export default connect(mapStateToProps)(TagList);
