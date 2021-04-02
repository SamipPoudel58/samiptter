import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import { useDispatch, useSelector } from "react-redux";
import { listTweetDetails } from "../actions/tweetActions";

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
  }, [dispatch, match]);

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
              <Link to="/">
                <i className="fas fa-arrow-left"></i>
              </Link>

              <span className="ml-5 go-back-heading">Tweet</span>
            </Row>
            <Tweet tweet={tweet} />
          </Col>
          <Col>3 of 3</Col>
        </Row>
      )}
    </>
  );
};

export default TweetScreen;
