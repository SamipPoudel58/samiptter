import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import SideNav from "../components/SideNav";

import { getProfile, addFriendAction } from "../actions/userActions";
import BackButton from "../components/BackButton";
import FollowRecommendation from "../components/FollowRecommendation";

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { loading, error, tweets, user } = userProfile;

  const addFriend = useSelector((state) => state.addFriend);
  let { error: followError } = addFriend;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getProfile(match.params.id || userInfo._id));
    }
  }, [history, userInfo, dispatch, match.params.id]);

  const followHandler = () => {
    dispatch(addFriendAction(user._id));
    dispatch(getProfile(match.params.id || userInfo._id));
  };
  return (
    <Row className="mainRow">
      <Col className="firstCol">
        <SideNav />
      </Col>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
            {user.isFriend && <p className="ml-2 text-info">Following</p>}
            {followError && <Message variant="danger">{followError}</Message>}

            {match.params.id && !user.isFriend && (
              <button
                onClick={followHandler}
                className="profileScreen__follow ml-auto"
              >
                Follow
              </button>
            )}
            {match.params.id && user.isFriend && (
              <button
                onClick={followHandler}
                className="profileScreen__follow ml-auto"
              >
                Unfollow
              </button>
            )}
          </Row>
          <Row className="profileScreen__details-bio u-line">
            <p>{user.bio}</p>
          </Row>
          <Row className="profileScreen__details-friends flex align-items-center u-line py-2">
            <h4 className="m-0 p-0 my-font font-weight-bold pr-2">
              {user.friends.length}
            </h4>
            Friends
          </Row>
          <Row className="p-3 my-font font-weight-bold u-line">Tweets</Row>
          {tweets.map((tweet) => (
            <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
          ))}
        </Col>
      )}

      <Col className="thirdCol">
        <FollowRecommendation />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
