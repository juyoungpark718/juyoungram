import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import Loading from 'components/Loading';
import Ionicon from 'react-ionicons';
import UserList from 'components/UserList';
import PhotoDisplay from 'components/PhotoDisplay';
import { Link } from 'react-router-dom';

const Profile = (props, context) => {
  if (props.loading) {
    return <LoadingProfile />;
  } else if (props.userProfile) {
    return <RenderProfile {...props} />;
  }
};

const LoadingProfile = props => (
  <div className={styles.profile}>
    <Loading />
  </div>
);

const RenderProfile = props => (
  <div className={styles.profile}>
    <header className={styles.profileHeader}>
      <div className={styles.profileimageBox}>
        <div className={styles.profileimageWrapper}>
          <img
            src={
              props.userProfile.profile_image || require('images/noPhoto.jpg')
            }
            alt={props.userProfile.username}
          />
        </div>
      </div>
      <section className={styles.userinfoSec}>
        <div className={styles.userinfoConfig}>
          <h1>{props.userProfile.username}</h1>
          <button className={styles.userinfoEditbtn}>Edit Profile</button>
          <div className={styles.userinfoConfigbtn}>
            <Ionicon
              className={styles.iosSettings}
              icon="ios-settings"
              onClick={props.openConfig}
            />
          </div>
        </div>
        <div className={styles.userinfoEditbtnBox}>
          <button className={styles.userinfoEditbtnPhone}>Edit Profile</button>
        </div>
        <div className={styles.userinfoListBox}>
          <ul className={styles.userinfoList}>
            <li>
              <span>
                <span className={styles.userinfoCount}>
                  {props.userProfile.images.length}{' '}
                </span>
                {props.userProfile.images.length === 1 ? 'Post' : 'Posts'}
              </span>
            </li>
            <li className={styles.userinfoFollow} onClick={props.openFollowers}>
              <span>
                <span className={styles.userinfoCount}>
                  {props.userProfile.followers_count}{' '}
                </span>
                {props.userProfile.followers_count === 1
                  ? 'Follower'
                  : 'Followers'}
              </span>
            </li>
            <li className={styles.userinfoFollow} onClick={props.openFollowing}>
              <span>
                <span className={styles.userinfoCount}>
                  {props.userProfile.following_count}
                </span>{' '}
                Follow
              </span>
            </li>
          </ul>
          <div className={styles.userinfoNamebox}>{props.userProfile.name}</div>
        </div>
      </section>
      {props.seeingFollowers && (
        <UserList
          title="Followers"
          closeLikes={props.closeFollowers}
          userList={props.followUserList}
          follow={true}
        />
      )}
      {props.seeingFollowing && (
        <UserList
          title="Following"
          closeLikes={props.closeFollowing}
          userList={props.followingUserList}
          follow={false}
        />
      )}
    </header>

    <div className={styles.userinfoListBoxPhone}>
      <div className={styles.userinfoNamebox}>{props.userProfile.name}</div>
      <ul className={styles.userinfoList}>
        <li>
          <span>
            {props.userProfile.images.length === 1 ? 'Post' : 'Posts'}
            <span className={styles.userinfoCount}>
              {props.userProfile.images.length}{' '}
            </span>
          </span>
        </li>
        <li className={styles.userinfoFollow} onClick={props.openFollowers}>
          <span>
            {props.userProfile.followers_count === 1 ? 'Follower' : 'Followers'}
            <span className={styles.userinfoCount}>
              {props.userProfile.followers_count}{' '}
            </span>
          </span>
        </li>
        <li className={styles.userinfoFollow} onClick={props.openFollowing}>
          <span>
            Follow
            <span className={styles.userinfoCount}>
              {props.userProfile.following_count}
            </span>{' '}
          </span>
        </li>
      </ul>
    </div>

    <div className={styles.userinfoPostbox}>
      <div className={styles.userinfoNav}>
        <span>
          <Ionicon icon="md-grid" color="#999" /> Post
        </span>
      </div>
      <div className={styles.content}>
        <RenderUserPosts imageList={props.userProfile.images} />
      </div>
    </div>
    {props.seeingConfig && (
      <ConfigList
        title="Config"
        closeConfig={props.closeConfig}
        logout={props.logout}
      />
    )}
  </div>
);

const RenderUserPosts = props =>
  props.imageList.map(photo => <PhotoDisplay photo={photo} key={photo.id} />);

const ConfigList = props => (
  <div className={styles.config} onClick={props.closeConfig}>
    <div className={styles.configBoxContainer}>
      <div className={styles.configBox}>
        <Link to="/">
          <button className={styles.configInButtonTop} onClick={props.logout}>
            로그아웃
          </button>
        </Link>
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  userProfile: PropTypes.object,
  openFollowers: PropTypes.func.isRequired,
  openFollowing: PropTypes.func.isRequired,
  closeFollowers: PropTypes.func.isRequired,
  closeFollowing: PropTypes.func.isRequired,
};

RenderProfile.propTypes = {
  userProfile: PropTypes.object,
  openFollowers: PropTypes.func.isRequired,
  openFollowing: PropTypes.func.isRequired,
  closeFollowers: PropTypes.func.isRequired,
  closeFollowing: PropTypes.func.isRequired,
};

export default Profile;
