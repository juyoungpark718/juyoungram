import { connect } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { searchUserList, imageList },
    routing: { location },
  } = state;
  return {
    imageList,
    searchUserList,
    location,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { searchTerm },
    },
  } = ownProps;
  return {
    searchByTerm: () => {
      dispatch(userActions.searchByTerm(searchTerm, 'search'));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
