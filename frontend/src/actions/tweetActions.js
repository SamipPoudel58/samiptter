import {
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_TWEET_FAIL,
  CREATE_TWEET_REQUEST,
  CREATE_TWEET_SUCCESS,
  DELETE_TWEET_FAIL,
  DELETE_TWEET_SUCCESS,
  TWEET_DETAILS_FAIL,
  TWEET_DETAILS_REQUEST,
  TWEET_DETAILS_SUCCESS,
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

export const listTweetDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TWEET_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get("/api/tweets/" + id, config);

    dispatch({
      type: TWEET_DETAILS_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: TWEET_DETAILS_FAIL,
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
    console.log(data);
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

export const likeTweet = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/tweets/${id}/like`, config);
  } catch (error) {
    console.error(error);
  }
};

export const likeComment = (id, comId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.get(`/api/tweets/${id}/${comId}`, config);
  } catch (error) {
    console.error(error);
  }
};

export const createComment = (id, comment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_COMMENT_REQUEST,
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

    await axios.post(`/api/tweets/${id}`, comment, config);

    dispatch({
      type: CREATE_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CREATE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteComment = (id, comId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tweets/${id}/${comId}`, config);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTweet = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tweets/${id}`, config);

    dispatch({
      type: DELETE_TWEET_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TWEET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
