import {
  CREATE_TWEET_FAIL,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  TWEET_DETAILS_FAIL,
  TWEET_DETAILS_REQUEST,
  TWEET_DETAILS_RESET,
  TWEET_DETAILS_SUCCESS,
  TWEET_LIST_FAIL,
  TWEET_LIST_REQUEST,
  TWEET_LIST_SUCCESS,
} from "../constants/tweetConstants";

export const tweetListReducer = (state = { tweets: [] }, action) => {
  switch (action.type) {
    case TWEET_LIST_REQUEST:
      return { loading: true, tweets: [] };
    case TWEET_LIST_SUCCESS:
      return {
        loading: false,
        tweets: action.payload,
      };
    case TWEET_LIST_FAIL:
      return { loading: false, error: action.payload };
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
    default:
      return state;
  }
};

// export const tweetLikeReducer = (state = {}, action) => {
//   switch (action.type) {
//     case TWEET_LIKE_REQUEST:
//       return { loading: true };
//     case TWEET_LIKE_SUCCESS:
//       return {
//         loading: false,
//         success: true,
//         tweet: action.payload,
//       };
//     case TWEET_LIKE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
