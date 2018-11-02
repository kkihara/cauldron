// @flow
import { connect } from 'react-redux';
import PageList from '../components/PageList';

const filterPages = (pages) => {
  return pages;
};

const mapStateToProps = state => ({
  pages: filterPages(state.pages)
});

const mapDispatchToProps = dispatch => ({
  // onClick: display pdfPage
});

export default connect(mapStateToProps)(PageList);
