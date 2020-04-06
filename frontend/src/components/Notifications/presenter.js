import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Ionicon from 'react-ionicons';
import Loading from 'components/Loading';
import NotificationDisplay from 'components/NotificationDisplay';

const Notifications = props => {
  if (props.loading) {
    return <LoadingNotifications {...props} />;
  } else if (props.notifications && props.userList) {
    return (
      <RenderedNotifications
        {...props}
        notifications={props.notifications}
        userList={props.userList}
      />
    );
  } else {
    return <LoadingNotifications {...props} />;
  }
};

const LoadingNotifications = props => (
  <div className={styles.notifications}>
    <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
    <div className={styles.close} onClick={props.closeNotifications} />
    <div className={styles.triangle} />
    <div className={styles.eraseLine} />
    <div className={styles.box}>
      <Loading />
    </div>
  </div>
);

const RenderedNotifications = props => (
  <div className={styles.notifications}>
    <Ionicon icon="ios-heart-outline" fontSize="28px" color="black" />
    <div className={styles.close} onClick={props.closeNotifications} />
    <div className={styles.triangle} />
    <div className={styles.eraseLine} />
    <div className={styles.box}>
      {!props.loading &&
        props.notifications.length < 1 && <span>No notifications</span>}
      {!props.loading &&
        props.userList.length > 0 &&
        props.notifications.length > 0 && (
          <RenderedNotificationDisplay
            {...props}
            notifications={props.notifications}
            userList={props.userList}
          />
        )}
    </div>
  </div>
);

const RenderedNotificationDisplay = props => {
  return props.notifications.map(notification => {
    if (notification.notification_type === 'like') {
      return (
        <NotificationDisplay
          {...notification}
          key={notification.id}
          user={notification.creator}
          notification_type={notification.notification_type}
          time={notification.natural_time}
          horizontal={true}
        />
      );
    } else if (notification.notification_type === 'follow') {
      return props.userList.map(user => {
        if (notification.creator.id === user.id) {
          return (
            <NotificationDisplay
              {...notification}
              key={notification.id}
              user={user}
              notification_type={notification.notification_type}
              time={notification.natural_time}
              horizontal={true}
            />
          );
        }
      });
    } else if (notification.notification_type === 'comment') {
      return (
        <NotificationDisplay
          {...notification}
          key={notification.id}
          user={notification.creator}
          notification_type={notification.notification_type}
          time={notification.natural_time}
          horizontal={true}
        />
      );
    }
  });
};

export default Notifications;
