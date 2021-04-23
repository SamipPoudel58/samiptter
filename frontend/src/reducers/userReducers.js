import {
  ADD_FRIEND_FAIL,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProfileReducer = (
  state = { tweets: [], user: { friends: [] } },
  action
) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true, tweets: [], user: {} };
    case GET_PROFILE_SUCCESS:
      return {
        loading: false,
        tweets: action.payload.tweets,
        user: action.payload.user,
      };
    case GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addFriendReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_FRIEND_REQUEST:
      return { loading: true };
    case ADD_FRIEND_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ADD_FRIEND_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
