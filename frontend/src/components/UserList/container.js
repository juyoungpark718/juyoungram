import React, { Component } from 'react';
import UserList from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    const { followUserList, followingUserList, userList } = this.props;
    if (followUserList || followingUserList || userList) {
      this.setState({ loading: false });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.followUserList ||
      nextProps.followingUserList ||
      nextProps.userList
    ) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return <UserList {...this.props} {...this.state} />;
  }
}
export default Container;
