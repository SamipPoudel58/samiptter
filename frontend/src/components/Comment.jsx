import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Image, Form, Button, Row, Col } from "react-bootstrap";
import { likeComment, likeTweet, listTweets } from "../actions/tweetActions";

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

const Comment = ({ tweet, userInfo, mainTweetId }) => {
  const [like, setLike] = useState(tweet.isLiked);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);

  const dispatch = useDispatch();

  useEffect(() => {
    setLike(tweet.isLiked);
    setNumLikes(tweet.numLikes);
  }, [tweet.isLiked, tweet.numLikes]);

  const likeHandler = () => {
    dispatch(likeComment(mainTweetId, tweet._id));
    setLike((prev) => !prev);
    like
      ? setNumLikes((prevNum) => prevNum - 1)
      : setNumLikes((prevNum) => prevNum + 1);
  };
  return (
    <>
      {tweet && (
        <Row className="py-2 tweet">
          <Col className="pr-0 picture-col">
            <Image
              className="pr-0 profilePic"
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
            <Link className="tweetContent" to={`/tweets/${tweet._id}`}>
              <Row className="pr-3">{tweet.tweetContent}</Row>
            </Link>
            <Row className="mt-3">
              <Col
                onClick={likeHandler}
                className="pl-0 d-flex align-items-center likeButton"
              >
                <i
                  className={`fs-18 ${like ? "fas fa-heart" : "far fa-heart"}`}
                ></i>

                <span className="fs-12 ml-2">{numLikes}</span>
              </Col>
              {tweet.user._id.toString() === userInfo._id && (
                <Col className="pl-0 d-flex align-items-center commentButton">
                  <svg
                    viewBox="0 0 24 24"
                    className="comment-icon r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"
                  >
                    <g>
                      <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
                    </g>
                  </svg>
                  <span className="fs-12 ml-2">{tweet.numComments}</span>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default Comment;
