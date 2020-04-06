import React, { Component } from 'react';
import Profile from './presenter';

class Container extends Component {
  state = {
    loading: true,
    seeingFollowers: false,
    seeingFollowing: false,
    seeingConfig: false,
  };

  componentDidMount() {
    const { searchUserProfile } = this.props;
    if (!this.props.userProfile) {
      searchUserProfile();
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.userProfile) {
      this.setState({
        loading: false,
      });
    }
  };

  _openFollowers = () => {
    const { getFollowers, followUserList } = this.props;
    this.setState({
      seeingFollowers: true,
    });
    if (!followUserList) {
      getFollowers();
    }
  };

  _closeFollowers = () => {
    this.setState({
      seeingFollowers: false,
    });
  };

  _openFollowing = () => {
    const { getFollowing, followingUserList } = this.props;
    this.setState({
      seeingFollowing: true,
    });
    if (!followingUserList) {
      getFollowing();
    }
  };

  _closeFollowing = () => {
    this.setState({
      seeingFollowing: false,
    });
  };

  _openConfig = () => {
    this.setState({
      seeingConfig: true,
    });
  };

  _closeConfig = () => {
    this.setState({
      seeingConfig: false,
    });
  };

  render() {
    const { userProfile, logOut } = this.props;
    return (
      <Profile
        {...this.state}
        {...this.props}
        userProfile={userProfile}
        openFollowers={this._openFollowers}
        openFollowing={this._openFollowing}
        closeFollowers={this._closeFollowers}
        closeFollowing={this._closeFollowing}
        openConfig={this._openConfig}
        closeConfig={this._closeConfig}
        logout={logOut}
      />
    );
  }
}

export default Container;
