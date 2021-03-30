import {
  CREATE_TWEET_FAIL,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  TWEET_LIST_FAIL,
  TWEET_LIST_REQUEST,
  TWEET_LIST_SUCCESS,
} from "../constants/tweetConstants";
import axios from "axios";

export const listTweets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TWEET_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tweets`, config);

    dispatch({
      type: TWEET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TWEET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createTweet = (tweet) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TWEET_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/tweets`, tweet, config);

    dispatch({
      type: CREATE_TWEET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_TWEET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
