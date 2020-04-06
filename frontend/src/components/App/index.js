import { connect } from 'react-redux';
import Container from './container';

const mapStateProps = (state, ownProps) => {
  const {
    user,
    routing: { location },
  } = state;
  return {
    isLoggedIn: user.isLoggedIn,
    pathname: location.pathname,
  };
};

export default connect(mapStateProps)(Container);
