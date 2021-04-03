import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import { useDispatch, useSelector } from "react-redux";
import { listTweetDetails } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import { TWEET_DETAILS_RESET } from "../constants/tweetConstants";
import Comment from "../components/Comment";

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

const TweetScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetDetails = useSelector((state) => state.tweetDetails);
  let { loading, error, tweet } = tweetDetails;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweetDetails(match.params.id));
      console.log(tweet);
    }
  }, [dispatch, match, history, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>1 of 3</Col>
          <Col className="newsFeed" md={7}>
            <Row className="p-3 u-line">
              <Link
                onClick={() => dispatch({ type: TWEET_DETAILS_RESET })}
                to="/"
              >
                <i className="fas fa-arrow-left"></i>
              </Link>

              <span className="ml-5 go-back-heading">Tweet</span>
            </Row>

            <Tweet tweet={tweet} />
            <TweetComposer buttonText="Comment" />
            {tweet.comments.map((comment) => (
              <Comment
                mainTweetId={tweet._id}
                tweet={comment}
                userInfo={userInfo}
                key={comment._id}
              />
            ))}
          </Col>
          <Col>3 of 3</Col>
        </Row>
      )}
    </>
  );
};

export default TweetScreen;
