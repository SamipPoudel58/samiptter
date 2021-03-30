import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { listTweets } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
import { TWEET_LIST_SUCCESS } from "../constants/tweetConstants";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweets());

      const socket = openSocket("/");
      socket.on("tweets", (data) => {
        if (data.action === "create") {
          dispatch(listTweets());
          // console.log(data.tweet);
          // console.log(tweets);
          // let tweets = [data.tweet, ...tweets];
          // dispatch({
          //   type: TWEET_LIST_SUCCESS,
          //   payload: tweets,
          // });
        }
      });
    }
  }, [history, userInfo, dispatch]);
  return (
    <Row>
      <Col>1 of 3</Col>
      <Col className="newsFeed" md={7}>
        <TweetComposer />
        {tweets.map((tweet) => (
          <Tweet tweet={tweet} key={tweet._id} />
        ))}
      </Col>
      <Col>3 of 3</Col>
    </Row>
  );
};

export default HomeScreen;
