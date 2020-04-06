import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import TimeStamp from 'components/TimeStamp';

const NotificationDisplay = (props, context) => (
  <div className={props.horizontal ? styles.horizontal : styles.vertical}>
    <div className={styles.column}>
      <img
        src={props.profile_image || require('images/noPhoto.jpg')}
        alt={props.user.username}
        className={props.big ? styles.bigAvatar : styles.avatar}
      />
      <div className={styles.user}>
        <span className={styles.username}>{props.user.username}</span>
        {props.notification_type === 'follow' ? (
          <span>
            님이 회원님을 팔로우하기 시작했습니다.
            <TimeStamp time={props.time} />
          </span>
        ) : null}
        {props.notification_type === 'like' ? (
          <span>
            님이 회원님의 사진을 좋아합니다 <TimeStamp time={props.time} />
          </span>
        ) : null}
        {props.notification_type === 'comment' ? (
          <span>
            님이 회원님의 사진에 댓글을 남겼습니다.
            <TimeStamp time={props.time} />
          </span>
        ) : null}
      </div>
    </div>

    <span className={styles.column}>
      {props.notification_type === 'follow' ? (
        <button className={styles.button} onClick={props.handleClick}>
          {props.user.following ? context.t('UnFollow') : context.t('Follow')}
        </button>
      ) : null}
      {props.notification_type === 'like' ? (
        <RectimageDisplay {...props} />
      ) : null}
      {props.notification_type === 'comment' ? (
        <RectimageDisplay {...props} />
      ) : null}
    </span>
  </div>
);

const RectimageDisplay = props => (
  <div className={styles.imageWrapper}>
    <div className={styles.image}>
      <div className={styles.imageCentered}>
        <img
          className={styles.photo}
          src={props.image.file}
          alt={'Something else'}
          ref={img => {
            if (img) {
              img.style.maxHeight =
                Math.ceil((img.width / img.height) * 100) + '%';
              img.style.height = '100%';
              console.log(img.width);
            }
          }}
        />
      </div>
    </div>
  </div>
);

NotificationDisplay.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default NotificationDisplay;
