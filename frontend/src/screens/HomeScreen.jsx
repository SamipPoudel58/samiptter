import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { listTweets } from "../actions/tweetActions";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";
import { logout, recommendUsers } from "../actions/userActions";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  const getRecommendedUsers = useSelector((state) => state.getRecommendedUsers);
  let {
    loading: loadingRecommended,
    error: errorRecommended,
    users: usersRecommended,
  } = getRecommendedUsers;

  const tweetDelete = useSelector((state) => state.tweetDelete);
  let {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = tweetDelete;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(listTweets());
      dispatch(recommendUsers());
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
          tweets.map((tweet) => (
            <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
          ))
        )}
      </Col>
      <Col className="thirdCol">
        <Row className="py-3 u-line">
          <p className="m-0 font-weight-bold my-font text-center w-100">
            Who To Follow
          </p>
        </Row>
        {loadingRecommended ? (
          <Loader />
        ) : errorRecommended ? (
          <Message variant="danger">{errorRecommended}</Message>
        ) : (
          usersRecommended.map((user) => (
            <Row className="py-2">
              <Col className="pr-0 picture-col-recommended">
                <Image
                  className="pr-0 profilePic"
                  src={user.image}
                  alt={user.name}
                  fluid
                />
              </Col>
              <Col className="pl-0 pt-1">
                <Link
                  to={`/profile/${user._id}`}
                  className="pl-0 font-weight-bold text-primary font-f-os"
                >
                  {user.name}
                </Link>
              </Col>
              <Col>
                <Row className="pr-2">
                  <Link
                    to={`/profile/${user._id}`}
                    className="recommendedFollowButton ml-auto"
                  >
                    Follow
                  </Link>
                </Row>
              </Col>
            </Row>
          ))
        )}
      </Col>
    </Row>
  );
};

export default HomeScreen;
