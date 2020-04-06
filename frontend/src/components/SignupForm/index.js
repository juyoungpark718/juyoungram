import { connect } from 'react-redux';
import Container from './container';
import { actionCreators as UserActions } from 'redux/modules/user';

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    facebookLogin: access_token => {
      dispatch(UserActions.facebookLogin(access_token));
    },
    createAccount: (username, password, email, name) => {
      dispatch(UserActions.createAccount(username, password, email, name));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Container);
