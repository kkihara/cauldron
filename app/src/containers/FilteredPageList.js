// @flow
import { connect } from 'react-redux';
import PageList from '../components/PageList';
import { setCurrentPage } from '../actions';

const filterPages = state => {
  return Object.values(state.pagesById);
};

const mapStateToProps = state => ({
  pages: filterPages(state)
});

const mapDispatchToProps = dispatch => ({
  setPage: (id: string) => dispatch(setCurrentPage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
