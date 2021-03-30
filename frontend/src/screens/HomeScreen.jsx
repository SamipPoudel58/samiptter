import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { listTweets } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  const { loading, error, tweets } = tweetList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweets());
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
