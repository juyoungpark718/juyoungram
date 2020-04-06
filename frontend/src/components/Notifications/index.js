import { connect } from 'react-redux';
import { actionCreators as userActions } from 'redux/modules/user';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { notifications, userList },
  } = state;
  return {
    notifications,
    userList,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getNotifications: () => {
      dispatch(userActions.getNotifications());
    },
    getExplore: () => {
      dispatch(userActions.getExplore());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
