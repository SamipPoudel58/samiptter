import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";
import Layout from "../components/Layout";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  const tweetDelete = useSelector((state) => state.tweetDelete);
  let { success: successDelete } = tweetDelete;
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweets());
      if (successDelete) {
        dispatch(listTweets());
      }

      const socket = openSocket("/");
      socket.on("tweets", (data) => {
        if (data.action === "create") {
          dispatch(listTweets());
        }
      });
    }
    return () => {
      dispatch({ type: TWEET_LIST_RESET });
    };
  }, [history, userInfo, dispatch, successDelete]);

  return (
    <div className="homeScreen">
      <Layout>
        <section className="newsFeed">
          <TweetComposer buttonText="Post" />
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            userInfo &&
            tweets.map((tweet) => (
              <div className="mt-2" key={tweet._id}>
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
