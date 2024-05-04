import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_TWEET_FAIL,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_TWEET_FAIL,
  DELETE_TWEET_REQUEST,
  DELETE_TWEET_SUCCESS,
  DELETE_TWEET_RESET,
  TWEET_DETAILS_FAIL,
  TWEET_DETAILS_REQUEST,
  TWEET_DETAILS_RESET,
  TWEET_DETAILS_SUCCESS,
  TWEET_LIST_FAIL,
  TWEET_LIST_REQUEST,
  TWEET_LIST_RESET,
  TWEET_LIST_SUCCESS,
  CREATE_TWEET_RESET,
  EDIT_TWEET_SETUP,
  EDIT_TWEET_REQUEST,
  EDIT_TWEET_SUCCESS,
  EDIT_TWEET_FAIL,
  EDIT_TWEET_RESET,
  TWEET_LIST_SYNC,
} from '../constants/tweetConstants';

export const tweetListReducer = (state = { tweets: [] }, action) => {
  switch (action.type) {
    case TWEET_LIST_REQUEST:
      return { ...state, loading: true };
    case TWEET_LIST_SUCCESS:
      return {
        loading: false,
        tweets: [...new Set([...state.tweets, ...action.payload.tweets])],
        pages: action.payload.pages,
      };
    case TWEET_LIST_SYNC:
      return { ...state, loading: false, tweets: action.payload.tweets };
    case TWEET_LIST_FAIL:
      return { loading: false, error: action.payload };

    case TWEET_LIST_RESET:
      return {
        tweets: [],
      };
    default:
      return state;
  }
};

export const tweetDetailsReducer = (
  state = {
    tweet: { user: {}, likes: [], comments: [], isLiked: false, numLikes: 0 },
  },
  action
) => {
  switch (action.type) {
    case TWEET_DETAILS_REQUEST:
      return { loading: true, ...state };
    case TWEET_DETAILS_SUCCESS:
      return { loading: false, tweet: action.payload };
    case TWEET_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case TWEET_DETAILS_RESET:
      return {
        tweet: {
          user: {},
          likes: [],
          comments: [],
          isLiked: false,
          numLikes: 0,
        },
      };
    default:
      return state;
  }
};

export const tweetCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TWEET_REQUEST:
      return { loading: true };
    case CREATE_TWEET_SUCCESS:
      return {
        loading: false,
        success: true,
        tweet: action.payload,
      };
    case CREATE_TWEET_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TWEET_RESET:
      return {};

    default:
      return state;
  }
};

export const tweetEditReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_TWEET_SETUP:
      return { ...state, tweetToEdit: action.payload };
    case EDIT_TWEET_REQUEST:
      return { ...state, loading: true };
    case EDIT_TWEET_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        tweet: action.payload,
      };
    case EDIT_TWEET_FAIL:
      return { ...state, loading: false, error: action.payload };
    case EDIT_TWEET_RESET:
      return {};

    default:
      return state;
  }
};

export const commentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { loading: true };
    case CREATE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CREATE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const commentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const tweetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TWEET_REQUEST:
      return { loading: true };
    case DELETE_TWEET_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_TWEET_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_TWEET_RESET:
      return {};
    default:
      return state;
  }
};
