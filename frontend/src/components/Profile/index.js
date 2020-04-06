import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { userProfile },
  } = state;

  return {
    userProfile,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    searchUserProfile: () => {
      dispatch(userActions.searchUserProfile());
    },
    getFollowers: () => {
      dispatch(userActions.getFollowers());
    },
    getFollowing: () => {
      dispatch(userActions.getFollowing());
    },
    logOut: () => {
      dispatch(userActions.logout());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
