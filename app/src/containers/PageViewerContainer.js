// @flow

import { connect } from 'react-redux';
import { updatePdfHighlight } from '../actions';

const mapStateToProps = state => ({
  currentPage: state.currentPage
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id, encoded) => dispatch(updatePdfHighlight(id, encoded))
});
