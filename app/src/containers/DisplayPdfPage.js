// @flow

import { connect } from 'react-redux';
import { newHighlight } from '../actions';
import PdfPage from '../components/PdfPage';

const mapStateToProps = state => ({
  highlights: state.highlights
});

const mapDispatchToProps = dispatch => ({
  addHighlight: highlight => dispatch(newHighlight(highlight))
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfPage);
