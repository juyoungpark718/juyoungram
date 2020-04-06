import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import UserDisplay from 'components/UserDisplay';

const UserList = props => (
  <div className={styles.container}>
    <div className={styles.overlay} />
    <div className={styles.box}>
      <header className={styles.header}>
        <h4 className={styles.title}>{props.title}</h4>
        <span onClick={props.closeLikes}>
          <Ionicon icon="md-close" fontSize="20px" color="black" />
        </span>
      </header>
      <div className={styles.content}>
        {props.loading ? (
          <Loading />
        ) : (
          <RenderUsers
            userList={props.userList}
            searchUserList={props.searchUserList}
            list={props.follow ? props.followUserList : props.followingUserList}
          />
        )}
      </div>
    </div>
  </div>
);

const RenderUsers = props => {
  if (props.list) {
    return props.list.map(user => (
      <UserDisplay horizontal={true} user={user} key={user.id} />
    ));
  } else if (props.userList) {
    return props.userList.map(user => (
      <UserDisplay horizontal={true} user={user} key={user.id} likes={true} />
    ));
  } else {
    return <span>No result</span>;
  }
};

RenderUsers.propTypes = {
  list: PropTypes.array,
};

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.array,
  closeLikes: PropTypes.func.isRequired,
  userList: PropTypes.array,
};

export default UserList;
