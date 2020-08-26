// @flow

import { connect } from 'react-redux';
import PageViewer from '../components/PageViewer';
import { putTitle } from '../actions/page';
import { zoomLevel } from '../actions/pdf';

const mapStateToProps = state => ({
  page: state.currentPage,
  view: state.currentView.value,
});

const mapDispatchToProps = dispatch => ({
  setTitle: (id: number, title: string) => dispatch(putTitle(id, title)),
  setZoom: (zoom: number) => dispatch(zoomLevel(zoom)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PageViewer);
