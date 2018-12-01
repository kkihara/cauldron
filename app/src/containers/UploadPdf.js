// @flow

import { connect } from 'react-redux';
import { setPageTypePdf } from '../actions';
import FilePicker from '../components/FilePicker';

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  text: 'Upload PDF'
})

const mapDispatchToProps = dispatch => ({
  setPath: (id: string) => (fileName: string) => dispatch(setPageTypePdf(id, fileName))
})

// TODO: combine id param into setPath()
export default connect(mapStateToProps, mapDispatchToProps)(FilePicker);
