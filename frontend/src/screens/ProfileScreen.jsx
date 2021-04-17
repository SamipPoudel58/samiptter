import React, { useState, useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { listTweets } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";
import { TWEET_LIST_SUCCESS } from "../constants/tweetConstants";
import "../styles/profileScreen.scss";

const ProfileScreen = ({ history }) => {
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
    }
  }, [history, userInfo, dispatch]);
  return (
    <Row className="mainRow">
      <Col className="firstCol">
        <SideNav />
      </Col>
      <Col className="newsFeed" md={7}>
        <Row className="p-3 u-line">
          <Link to="/">
            <i className="fas fa-arrow-left"></i>
          </Link>

          <span className="ml-3 go-back-heading">{userInfo.name}</span>
        </Row>
        <Row className="profileScreen__images">
          <Image
            className="profileScreen__coverpic"
            src="/images/cover.jpg"
            alt={`${userInfo.name} cover photo`}
            fluid
          />
          <Image
            className="profileScreen__profilepic"
            src={userInfo.image}
            alt={`${userInfo.name} profile photo`}
            fluid
          />
        </Row>
        <Row className="profileScreen__details u-line">
          <h4 className="profileScreen__details-name">{userInfo.name}</h4>
        </Row>
      </Col>
      <Col className="thirdCol">3 of 3</Col>
    </Row>
  );
};

export default ProfileScreen;