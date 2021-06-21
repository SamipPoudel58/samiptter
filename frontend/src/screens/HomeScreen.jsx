import React, { useEffect } from "react";
import openSocket from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";
import SideNav from "../components/SideNav";
import FollowRecommendation from "../components/FollowRecommendation";
import Message from "../components/Message";
import Loader from "../components/Loader";
import TweetComposer from "../components/TweetComposer";
import Tweet from "../components/Tweet";
// import { Row, Col } from "react-bootstrap";
// import Tweet from "../components/Tweet";
// import SideNav from "../components/SideNav";

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
    <div className="homeScreen">
      <SideNav />

      <section className="newsFeed">
        <TweetComposer />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          tweets.map((tweet) => (
            <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
          ))
        )}
      </section>

      <section className="rightNav__wrapper">
        <div className="rightNav">
          <FollowRecommendation />
        </div>
      </section>
    </div>
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
