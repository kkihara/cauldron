// @flow

import { connect } from 'react-redux';
import { putHighlight } from '../actions/pdf';
import PdfPage from '../components/PdfPage';

// TODO: valdiate state here?
const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  pdfBuffer: ownProps.pdfBuffer,
  highlights: ownProps.highlights,
});

const mapDispatchToProps = dispatch => ({
  updatePdfHighlight: (id: number) => (encoded: string) => dispatch(putHighlight(id, encoded))
});

const mergeProps = (propsFromState, propsFromDispatch) => ({
  id: propsFromState.id,
  pdfBuffer: propsFromState.pdfBuffer,
  highlights: propsFromState.highlights,
  updatePdfHighlight: propsFromDispatch.updatePdfHighlight(propsFromState.id)
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PdfPage);
