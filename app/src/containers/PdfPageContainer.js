// @flow

import { connect } from 'react-redux';
import { updatePdfHighlight } from '../actions';
import PdfPage from '../components/PdfPage';

// TODO: valdiate state here?
const mapStateToProps = (state, ownProps) => ({
  pdfDocument: ownProps.pdfDocument,
  highlights: state.highlightsById[ownProps.id],
  id: ownProps.id
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id: string) => (encoded: string) => dispatch(updatePdfHighlight(id, encoded))
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  pdfDocument: propsFromState.pdfDocument,
  highlights: propsFromState.highlights,
  updatePdfHighlight: propsFromDispatch.updatePdfHighlight(propsFromState.id)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PdfPage);
