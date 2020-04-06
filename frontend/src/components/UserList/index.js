import { connect } from 'react-redux';
import Container from './container';

const mapStateToProps = (state, ownProps) => {
  const {
    user: { followUserList, followingUserList, userList, searchUserList },
  } = state;
  return {
    followUserList,
    followingUserList,
    searchUserList,
    userList,
  };
};
export default connect(
  mapStateToProps,
  null
)(Container);
