// import

// actions

const SAVE_TOKEN = 'SAVE_TOKEN';
const LOGOUT = 'LOGOUT';
const SET_USER_LIST = 'SET_USER_LIST';
const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_IMAGE_LIST = 'SET_IMAGE_LIST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS';

// action creator

function saveToken(token, username) {
  return {
    type: SAVE_TOKEN,
    token,
    username,
  };
}

function logout() {
  return {
    type: LOGOUT,
  };
}

function setUserList(userList, option = 'explore') {
  if (option === 'follow') {
    return {
      type: SET_USER_LIST,
      followUserList: userList,
      option,
    };
  } else if (option === 'following') {
    return {
      type: SET_USER_LIST,
      followingUserList: userList,
      option,
    };
  } else if (option === 'search') {
    return {
      type: SET_USER_LIST,
      searchUserList: userList,
      option,
    };
  } else {
    return {
      type: SET_USER_LIST,
      userList,
      option,
    };
  }
}

function setFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId,
  };
}

function setUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId,
  };
}

function setImageList(imageList) {
  return {
    type: SET_IMAGE_LIST,
    imageList,
  };
}

function setUserProfile(userProfile) {
  return {
    type: SET_USER_PROFILE,
    userProfile,
  };
}

function setNotifications(notifications) {
  return {
    type: SET_NOTIFICATIONS,
    notifications,
  };
}

//API actions

function facebookLogin(access_token) {
  return dispatch => {
    fetch('/users/login/facebook/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_token,
      }),
    })
      .then(response => response.json())
      .then(json => {
        // console.log(json);
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch('/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token, username));
        }
      })
      .catch(err => console.log(err));
  };
}

function createAccount(username, password, email, name) {
  return function(dispatch) {
    fetch('/rest-auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email,
        name,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.token) {
          dispatch(saveToken(json.token));
        }
      })
      .catch(err => console.log(err));
  };
}

function getPhotoLikes(photoId, option) {
  return (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    fetch(`/images/${photoId}/likes/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setUserList(json, option));
      });
  };
}

function followUser(userId, notification = false) {
  return (dispatch, getState) => {
    dispatch(setFollowUser(userId, notification));
    const {
      user: { token },
    } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnfollowUser(userId, notification));
      }
    });
  };
}

function unfollowUser(userId, notification = false) {
  return (dispatch, getState) => {
    dispatch(setUnfollowUser(userId, notification));
    const {
      user: { token },
    } = getState();
    fetch(`/users/${userId}/unfollow/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setFollowUser(userId, notification));
      }
    });
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    fetch(`/users/explore/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => dispatch(setUserList(json)));
  };
}

function searchByTerm(searchTerm, option) {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();
    const userList = await searchUsers(token, searchTerm);
    const imageList = await searchImages(token, searchTerm);
    if (userList === 401 || imageList === 401) {
      dispatch(logout());
    }
    dispatch(setUserList(userList, option));
    dispatch(setImageList(imageList));
  };
}

function searchUsers(token, searchTerm) {
  return fetch(`/users/search/?username=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

function searchImages(token, searchTerm) {
  return fetch(`/images/search/?hashtags=${searchTerm}`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })
    .then(response => {
      if (response.status === 401) {
        return 401;
      }
      return response.json();
    })
    .then(json => json);
}

function searchUserProfile() {
  return (dispatch, getState) => {
    const {
      user: { token, username },
    } = getState();
    fetch(`/users/${username}/`, {
      mehtod: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => dispatch(setUserProfile(json)));
  };
}

function getFollowers() {
  return (dispatch, getState) => {
    const {
      user: { token, username },
    } = getState();
    fetch(`/users/${username}/followers/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => dispatch(setUserList(json, 'follow')));
  };
}

function getFollowing() {
  return (dispatch, getState) => {
    const {
      user: { token, username },
    } = getState();
    fetch(`/users/${username}/following/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => dispatch(setUserList(json, 'following')));
  };
}

function getNotifications() {
  return async (dispatch, getState) => {
    const {
      user: { token },
    } = getState();

    fetch(`/notifications/`, {
      headers: {
        Authorization: `JWT ${token}`,
      },
    })
      .then(response => {
        if (response.status === 401) {
          dispatch(logout());
        }
        return response.json();
      })
      .then(json => {
        dispatch(setNotifications(json));
      });
  };
}

// initial state
const initaiState = {
  isLoggedIn: localStorage.getItem('jwt') ? true : false,
  token: localStorage.getItem('jwt'),
  username: localStorage.getItem('username'),
};
// reducer

function reducer(state = initaiState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    case LOGOUT:
      return applyLogout(state, action);
    case SET_USER_LIST:
      return applySetUserList(state, action);
    case FOLLOW_USER:
      return applyFollowUser(state, action);
    case UNFOLLOW_USER:
      return applyUnFollowUser(state, action);
    case SET_IMAGE_LIST:
      return applySetImageList(state, action);
    case SET_USER_PROFILE:
      return applySetUserProfile(state, action);
    case SET_NOTIFICATIONS:
      return applySetNotifications(state, action);
    default:
      return state;
  }
}

// reducer functions

function applySetToken(state, action) {
  const { token, username } = action;
  localStorage.setItem('jwt', token);
  localStorage.setItem('username', username);
  return {
    ...state,
    isLoggedIn: true,
    token,
    username,
  };
}

function applyLogout(state, action) {
  localStorage.removeItem('jwt');
  localStorage.removeItem('username');
  return {
    isLoggedIn: false,
  };
}

function applySetUserList(state, action) {
  const { option } = action;
  const { username } = state;
  if (option === 'follow') {
    const { followUserList } = action;
    return {
      ...state,
      followUserList,
    };
  } else if (option === 'following') {
    const { followingUserList } = action;
    return {
      ...state,
      followingUserList,
    };
  } else if (option === 'likes') {
    const { userList } = action;
    return {
      ...state,
      userList,
    };
  } else if (option === 'search') {
    const { searchUserList } = action;
    return {
      ...state,
      searchUserList,
    };
  } else {
    const { userList } = action;
    const updateduserlist = [];
    userList.map(user => {
      if (user.username !== username) {
        updateduserlist.push(user);
      }
    });
    return {
      ...state,
      userList: updateduserlist,
    };
  }
}

function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: true };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}

function applyUnFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;

  const updatedUserList = userList.map(user => {
    if (user.id === userId) {
      return { ...user, following: false };
    }
    return user;
  });
  return { ...state, userList: updatedUserList };
}
function applySetImageList(state, action) {
  const { imageList } = action;
  return {
    ...state,
    imageList,
  };
}

function applySetUserProfile(state, action) {
  const { userProfile } = action;
  return {
    ...state,
    userProfile,
  };
}

function applySetNotifications(state, action) {
  const { notifications } = action;
  return {
    ...state,
    notifications,
  };
}

// exports

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  getPhotoLikes,
  followUser,
  unfollowUser,
  getExplore,
  searchByTerm,
  searchUserProfile,
  getFollowers,
  getFollowing,
  getNotifications,
};

export { actionCreators };

// reducer export

export default reducer;
