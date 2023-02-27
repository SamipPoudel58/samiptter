import { apiInstance, axiosPrivate } from '../api/apiInstances';
import getRefreshToken from '../api/getRefreshToken';
import { TWEET_LIST_RESET } from '../constants/tweetConstants';
import {
  FOLLOW_FAIL,
  FOLLOW_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  GET_NOTIFICATIONS_FAIL,
  GET_NOTIFICATIONS_REQUEST,
  GET_NOTIFICATIONS_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RECOMMENDED_USERS_FAIL,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  GET_UNREAD_NOTIF_REQUEST,
  GET_UNREAD_NOTIF_SUCCESS,
  GET_UNREAD_NOTIF_FAIL,
  LIST_USERS_FAIL,
  LIST_USERS_REQUEST,
  LIST_USERS_SUCCESS,
  TOGGLE_VERIFY_FAIL,
  TOGGLE_VERIFY_REQUEST,
  TOGGLE_VERIFY_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  GET_NOTIFICATIONS_RESET,
  GET_UNREAD_NOTIF_RESET,
  GET_RECOMMENDED_USERS_RESET,
  TOKEN_REFRESH_REQUEST,
  TOKEN_REFRESH_FAIL,
  TOKEN_REFRESH_SUCCESS,
} from '../constants/userConstants';

export const refreshToken = () => async (dispatch) => {
  try {
    dispatch({ type: TOKEN_REFRESH_REQUEST });
    const data = await getRefreshToken();
    dispatch({ type: TOKEN_REFRESH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: TOKEN_REFRESH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login =
  (email, password, guest = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await apiInstance.post(
        '/api/users/login',
        { email, password, guest },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    };

    await axiosPrivate.post('/api/users/logout', {}, config);

    dispatch({ type: USER_LOGOUT });
    dispatch({ type: TWEET_LIST_RESET });
    dispatch({ type: GET_NOTIFICATIONS_RESET });
    dispatch({ type: GET_UNREAD_NOTIF_RESET });
    dispatch({ type: GET_RECOMMENDED_USERS_RESET });
  } catch (error) {
    console.log(error);
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await apiInstance.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listUsers =
  (keyword = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_USERS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };

      const { data } = await axiosPrivate.get(
        `/api/users?keyword=${keyword}`,
        config
      );
      dispatch({
        type: LIST_USERS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_USERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getProfile = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axiosPrivate.get('/api/users/' + username, config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_NOTIFICATIONS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axiosPrivate.get('/api/users/notifications', config);

    dispatch({
      type: GET_NOTIFICATIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_NOTIFICATIONS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUnreadNotifications = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_UNREAD_NOTIF_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axiosPrivate.get(
      '/api/users/unreadnotifications',
      config
    );

    dispatch({
      type: GET_UNREAD_NOTIF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_UNREAD_NOTIF_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editProfile =
  (id, name, username, bio, image, cover, password) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: EDIT_PROFILE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      };

      const { data } = await axiosPrivate.put(
        '/api/users',
        { id, name, username, bio, image, cover, password },
        config
      );

      dispatch({
        type: EDIT_PROFILE_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: EDIT_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const followAction = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    await axiosPrivate.get(`/api/users/follow/${id}`, config);
    dispatch({
      type: FOLLOW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FOLLOW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const recommendUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_RECOMMENDED_USERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    const { data } = await axiosPrivate.get(`/api/users/recommended`, config);

    dispatch({
      type: GET_RECOMMENDED_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECOMMENDED_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleVerify = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TOGGLE_VERIFY_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.accessToken}`,
      },
    };

    await axiosPrivate.get(`/api/users/verify/${id}`, config);
    dispatch({
      type: TOGGLE_VERIFY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: TOGGLE_VERIFY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
