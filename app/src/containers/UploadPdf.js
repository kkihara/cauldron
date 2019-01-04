// @flow

import { connect } from 'react-redux';
import { putPageType } from '../actions/page';
import { uploadPdf } from '../actions/pdf';
import { pageTypes } from '../types';
import FilePicker from '../components/FilePicker';

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.id,
  text: 'Upload PDF'
})

const mapDispatchToProps = dispatch => ({
  setPath: (id: number) => (fileName: string) => {
    dispatch(putPageType(id, pageTypes.pdf));
    return dispatch(uploadPdf(id, fileName));
  }
})

// TODO: combine id param into setPath()
export default connect(mapStateToProps, mapDispatchToProps)(FilePicker);
