import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import {
  CREATE_TWEET_RESET,
  DELETE_TWEET_RESET,
} from "../constants/tweetConstants";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
import Head from "../components/Head";
import toast, { Toaster } from "react-hot-toast";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  const tweetCreate = useSelector((state) => state.tweetCreate);
  let { success: successTweetCreate } = tweetCreate;

  const tweetDelete = useSelector((state) => state.tweetDelete);
  let { success: successDelete } = tweetDelete;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  useEffect(() => {
    // if (tweets.length === 0) {
    //   dispatch(listTweets());
    // }
    dispatch(listTweets());

    if (successDelete) {
      dispatch(listTweets());
      toast.success("Post Deleted Successfully.");
    }
    if (successTweetCreate) {
      toast.success("Post Created Successfully.");
    }

    const socket = openSocket("/");
    socket.on("tweets", (data) => {
      if (data.action === "create") {
        dispatch(listTweets());
      }
    });

    return () => {
      // dispatch({ type: TWEET_LIST_RESET });
      dispatch({ type: DELETE_TWEET_RESET });
      dispatch({ type: CREATE_TWEET_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, dispatch, successDelete, successTweetCreate]);

  return (
    <div className="homeScreen">
      <Head title="Home" />
      <Layout>
        <Toaster
          toastOptions={
            darkMode
              ? {
                  style: {
                    fontSize: "1.6rem",
                    background: "#333",
                    color: "#fff",
                  },
                }
              : {
                  style: {
                    fontSize: "1.6rem",
                  },
                }
          }
        />
        <section className="newsFeed">
          <TweetComposer buttonText="Post" />
          {tweets?.length === 0 && <Loader />}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            userInfo &&
            tweets.map((tweet) => (
              <div className="tweetsMargin" key={tweet._id}>
                <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
              </div>
            ))
          )}
        </section>
      </Layout>
    </div>
  );
};

export default HomeScreen;
