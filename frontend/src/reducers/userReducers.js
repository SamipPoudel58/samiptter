import {
  ADD_FRIEND_FAIL,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  EDIT_PROFILE_FAIL,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_RESET,
  EDIT_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_RECOMMENDED_USERS_FAIL,
  GET_RECOMMENDED_USERS_REQUEST,
  GET_RECOMMENDED_USERS_SUCCESS,
  TOGGLE_VERIFY_FAIL,
  TOGGLE_VERIFY_REQUEST,
  TOGGLE_VERIFY_RESET,
  TOGGLE_VERIFY_SUCCESS,
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

export const editProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_PROFILE_REQUEST:
      return { loading: true };
    case EDIT_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case EDIT_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_PROFILE_RESET:
      return {};
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

export const getRecommendedUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case GET_RECOMMENDED_USERS_REQUEST:
      return { loading: true };
    case GET_RECOMMENDED_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
      };
    case GET_RECOMMENDED_USERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const toggleVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_VERIFY_REQUEST:
      return { loading: true };
    case TOGGLE_VERIFY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case TOGGLE_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    case TOGGLE_VERIFY_RESET:
      return {};
    default:
      return state;
  }
};
