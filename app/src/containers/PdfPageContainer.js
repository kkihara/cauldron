// @flow

import { connect } from 'react-redux';
import { putHighlight } from '../actions/pdf';
import PdfPage from '../components/PdfPage';

// TODO: valdiate state here?
const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  pdfDocument: ownProps.pdfDocument,
  highlights: ownProps.highlights,
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id: number) => (encoded: string) => dispatch(putHighlight(id, encoded))
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  pdfDocument: propsFromState.pdfDocument,
  highlights: propsFromState.highlights,
  updatePdfHighlight: propsFromDispatch.updatePdfHighlight(propsFromState.id)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PdfPage);
