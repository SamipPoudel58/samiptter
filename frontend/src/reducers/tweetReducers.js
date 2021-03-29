import {
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
