// @flow

import { connect } from 'react-redux';
import { updatePdfHighlight } from '../actions';
import PageViewer from '../components/PageViewer';

const mapStateToProps = state => ({
  currentPage: state.currentPage
});

export default connect(mapStateToProps)(PageViewer);
