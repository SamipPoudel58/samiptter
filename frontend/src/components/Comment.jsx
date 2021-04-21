import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Image, Row, Col } from "react-bootstrap";
import { likeComment, deleteComment } from "../actions/tweetActions";

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

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteComment(mainTweetId, tweet._id));
    }
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
                <Col
                  onClick={deleteHandler}
                  className="pl-0 d-flex align-items-center deleteButton"
                >
                  <i className="far fa-trash-alt"></i>
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
