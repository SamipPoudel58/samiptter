import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";

import "../styles/profileScreen.scss";
import { getProfile } from "../actions/userActions";
import BackButton from "../components/BackButton";

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { loading, error, tweets, user } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getProfile(match.params.id || userInfo._id));
    }
  }, [history, userInfo, dispatch, match.params.id]);
  return (
    <Row className="mainRow">
      <Col className="firstCol">
        <SideNav />
      </Col>
      <Col className="newsFeed" md={6}>
        <Row className="p-3 u-line">
          <BackButton />
          <span className="ml-3 go-back-heading">{user.name}</span>
        </Row>
        <Row className="profileScreen__images">
          <Image
            className="profileScreen__coverpic"
            src={user.cover}
            alt={`${user.name} cover photo`}
            fluid
          />
          <Image
            className="profileScreen__profilepic"
            src={user.image}
            alt={`${user.name} profile photo`}
            fluid
          />
        </Row>
        <Row className="profileScreen__details">
          <h4 className="profileScreen__details-name">{user.name}</h4>
        </Row>
        <Row className="profileScreen__details-bio">
          <p>{user.bio}</p>
        </Row>
        <Row className="p-3 my-font font-weight-bold u-line">Tweets</Row>

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
      <Col className="thirdCol">3 of 3</Col>
    </Row>
  );
};

export default ProfileScreen;
