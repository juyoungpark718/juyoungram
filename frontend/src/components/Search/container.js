import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Search from './presenter';
class Container extends Component {
  state = {
    loading: true,
  };
  static propTypes = {
    searchByTerm: PropTypes.func.isRequired,
    userList: PropTypes.array,
    imageList: PropTypes.array,
  };
  componentDidMount() {
    const { searchByTerm } = this.props;
    searchByTerm();
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { searchByTerm } = this.props;
    if (prevProps.match.params !== this.props.match.params) {
      searchByTerm();
    }
  };

  componentWillReceiveProps = nextProps => {
    const { searchByTerm, pathname } = this.props;
    if (nextProps.searchUserList && nextProps.imageList) {
      this.setState({
        loading: false,
      });
    }

    if (nextProps.pathname !== pathname) {
      searchByTerm();
    }
  };

  render() {
    const { searchUserList, imageList } = this.props;
    return (
      <Search
        {...this.state}
        location={this.props.location}
        searchUserList={searchUserList}
        imageList={imageList}
      />
    );
  }
}
export default Container;
