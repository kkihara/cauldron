// @flow

import { connect } from 'react-redux';
import PageViewer from '../components/PageViewer';

const mapStateToProps = state => ({
  ...state.currentPage.pageContents
});

export default connect(mapStateToProps)(PageViewer);
