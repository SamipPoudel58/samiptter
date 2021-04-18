import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { listTweets } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";
import { logout } from "../actions/userActions";

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
        }
      });
    }
  }, [history, userInfo, dispatch]);

  const logOutHandler = () => {
    dispatch(logout());
  };

  return (
    <Row className="mainRow">
      <Col className="p-0 firstCol">
        <SideNav logOutHandler={logOutHandler} />
      </Col>
      <Col className="newsFeed" md={6}>
        <Row className="p-3 u-line my-font font-weight-bold">Home</Row>
        <TweetComposer buttonText="Tweet" />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          tweets.map((tweet) => <Tweet tweet={tweet} key={tweet._id} />)
        )}
      </Col>
      <Col className="thirdCol">3 of 3</Col>
    </Row>
  );
};

export default HomeScreen;
