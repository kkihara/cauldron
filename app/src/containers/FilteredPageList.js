// @flow
import { connect } from 'react-redux';
import PageList from '../components/PageList';
import { fetchPage } from '../actions/page';

const filterPages = state => {
  return state.pageList.pageList.slice();
};

const mapStateToProps = state => ({
  pages: filterPages(state)
});

const mapDispatchToProps = dispatch => ({
  setPage: (id: number) => dispatch(fetchPage(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
