import React, { Component } from 'react';
import Notifications from './presenter';

class Container extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { getNotifications, getExplore } = this.props;
    if (!this.props.notifications) {
      getNotifications();
      if (!this.props.userList) {
        getExplore();
      }
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.notifications) {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    const { notifications, userList } = this.props;
    return (
      <Notifications
        {...this.state}
        {...this.props}
        notifications={notifications}
        userList={userList}
        closeNotifications={this.props.closeNotifications}
      />
    );
  }
}

export default Container;
