import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";
import SideNav from "../components/SideNav";
// import { Row, Col } from "react-bootstrap";
// import TweetComposer from "../components/TweetComposer";
// import Tweet from "../components/Tweet";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
// import SideNav from "../components/SideNav";
// import FollowRecommendation from "../components/FollowRecommendation";

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
    <main className="homeScreen">
      <SideNav />
      <h1>HomeScreen</h1>
    </main>
    // <Row className="mainRow">
    //   <Col className="p-0 firstCol">
    //     <SideNav />
    //   </Col>
    //   <Col className="newsFeed" md={6}>
    //     <Row className="p-3 u-line my-font font-weight-bold">Home</Row>
    //     <TweetComposer buttonText="Tweet" />
    //     {loading ? (
    //       <Loader />
    //     ) : error ? (
    //       <Message variant="danger">{error}</Message>
    //     ) : (
    //       tweets.map((tweet) => (
    //         <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
    //       ))
    //     )}
    //   </Col>
    //   <Col className="thirdCol">
    //     <FollowRecommendation />
    //   </Col>
    // </Row>
  );
};

export default HomeScreen;
