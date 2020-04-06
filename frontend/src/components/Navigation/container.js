import React, { Component } from 'react';
import Navigation from './presenter';
import PropTypes from 'prop-types';

class Container extends Component {
  state = {
    term: '',
    seeingNotifications: false,
  };
  static propTypes = {
    goToSearch: PropTypes.func.isRequired,
  };
  render() {
    return (
      <Navigation
        {...this.state}
        onSubmit={this._onSubmit}
        onInputChange={this._onInputChange}
        value={this.state.term}
        openNotifications={this._openNotifications}
        closeNotifications={this._closeNotifications}
      />
    );
  }
  _onInputChange = event => {
    const {
      target: { value },
    } = event;
    this.setState({
      term: value,
    });
  };

  _onSubmit = event => {
    const { goToSearch } = this.props;
    const { term } = this.state;
    event.preventDefault();
    goToSearch(term);
    this.setState({
      term: '',
    });
  };

  _openNotifications = () => {
    console.log(this.state.seeingNotifications);
    this.setState({
      seeingNotifications: true,
    });
  };

  _closeNotifications = () => {
    this.setState({
      seeingNotifications: false,
    });
  };
}

export default Container;
