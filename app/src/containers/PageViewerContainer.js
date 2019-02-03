// @flow

import { connect } from 'react-redux';
import PageViewer from '../components/PageViewer';
import { putTitle } from '../actions/page';

const mapStateToProps = state => ({
  page: state.currentPage
});

const mapDispatchToProps = dispatch => ({
  setTitle: (id: number, title: string) => dispatch(putTitle(id, title))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageViewer);
