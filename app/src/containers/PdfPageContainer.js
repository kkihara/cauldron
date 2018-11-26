// @flow

import { connect } from 'react-redux';
import { updatePdfHighlight } from '../actions';
import PdfPage from '../components/PdfPage';

// TODO: valdiate state here?
const mapStateToProps = (state, ownProps) => ({
  pdfDocument: state.currentPage.pdfDocument,
  highlights: state.highlightsById[state.currentPage.id],
  container: ownProps.container
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id, encoded) => dispatch(updatePdfHighlight(id, encoded))
});

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PdfPage);
