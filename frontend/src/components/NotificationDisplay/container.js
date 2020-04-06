import React, { Component } from 'react';
import NotificationDisplay from './presenter';

class Container extends Component {
  render() {
    return <NotificationDisplay {...this.props} />;
  }
}

export default Container;
