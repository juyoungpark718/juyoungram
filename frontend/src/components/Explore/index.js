import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as userActions } from 'redux/modules/user';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { userList, username },
  } = state;
  return {
    userList,
    username,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getExplore: () => {
      dispatch(userActions.getExplore());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
