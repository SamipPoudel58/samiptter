import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { listTweets } from "../actions/tweetActions";
import * as dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
var updateLocale = require("dayjs/plugin/updateLocale");
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "1s",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mon",
    MM: "%dmon",
    y: "1y",
    yy: "%dy",
  },
});

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  const { loading, error, tweets } = tweetList;
  console.log(tweets, error);

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
        {tweets.map((tweet) => (
          <Row className="py-3 tweet" key={tweet._id}>
            <Col>
              <Image
                className="className=pr-0 profilePic"
                src={tweet.user.image}
                alt={tweet.user.name}
                fluid
              />
            </Col>
            <Col className="pl-0 pt-1" md={10}>
              <Row className="mb-1">
                <strong className="pl-0 font-weight-bold text-primary font-f-os">
                  {tweet.user.name}
                </strong>

                <span className="text-muted font-weight-bold mx-1 font-f-os">
                  .
                </span>
                <span className="text-muted ml-1">
                  {dayjs(tweet.createdAt).fromNow(true)}
                </span>
              </Row>
              <Row className="pr-3 tweetContent">{tweet.tweetContent}</Row>
            </Col>
          </Row>
        ))}
      </Col>
      <Col>3 of 3</Col>
    </Row>
  );
};

export default HomeScreen;
