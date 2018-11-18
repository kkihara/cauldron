// @flow

import { connect } from 'react-redux';
import { newHighlight } from '../actions';
import PdfPage from '../components/PdfPage';

const mapStateToProps = state => ({
  pdfDocument: state.pdfDocument,
  highlights: state.highlights
});

const mapDispatchToProps = dispatch => ({
  addHighlight: (start, end) => dispatch(newHighlight(start, end))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PdfPage);
