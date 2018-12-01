// @flow

import { connect } from 'react-redux';
import { updatePdfHighlight } from '../actions';
import PdfPage from '../components/PdfPage';

// TODO: valdiate state here?
const mapStateToProps = (state, ownProps) => ({
  pdfDocument: ownProps.pdfDocument,
  highlights: state.highlightsById[ownProps.id],
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id, encoded) => dispatch(updatePdfHighlight(id, encoded))
});

export default connect(mapStateToProps, mapDispatchToProps)(PdfPage);
