import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTweets } from "../actions/tweetActions";
import BackButton from "../components/BackButton";
import SideNav from "../components/SideNav";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Tweet from "../components/Tweet";
import "../styles/searchScreen.scss";

const SearchScreen = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetList = useSelector((state) => state.tweetList);
  let { loading, error, tweets } = tweetList;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      console.log(typeof keyword);
      if (keyword !== "") {
        console.log("yes");
        dispatch(listTweets(keyword));
      }
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    {
      keyword !== "" && dispatch(listTweets(keyword));
    }
  };
  return (
    <Row>
      <Col>
        <SideNav />
      </Col>
      <Col className="newsFeed" md={6}>
        <Row className="p-3 u-line d-flex align-items-center">
          <BackButton />
          <form
            onSubmit={submitHandler}
            className="searchScreen__searchbar ml-3"
          >
            <i className="fas fa-search"></i>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="searchScreen__searchbar-input"
              type="text"
            />
          </form>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            {tweets.length > 0 && (
              <Row className="p-3 u-line">
                Search Result for
                <strong className="ml-2 font-weight-bold my-font">{`"${keyword}"`}</strong>
              </Row>
            )}
            {tweets.map((tweet) => (
              <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
            ))}
          </>
        )}
      </Col>
      <Col>3 of 3</Col>
    </Row>
  );
};

export default SearchScreen;
