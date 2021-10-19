import React, { useEffect } from "react";
import { recommendUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";

const FollowRecommendation = () => {
  const dispatch = useDispatch();

  const getRecommendedUsers = useSelector((state) => state.getRecommendedUsers);
  let {
    loading: loadingRecommended,
    error: errorRecommended,
    users: usersRecommended,
  } = getRecommendedUsers;

  useEffect(() => {
    dispatch(recommendUsers());
  }, [dispatch]);
  return (
    <section className="followRecommendation">
      <div className="followRecommendation__topRow mb-2">
        <h3 className="heading-sm">Suggestions</h3>
        <a href="/" className="minor-link">
          Show More
        </a>
      </div>
      <div className="followRecommendation__userList">
        {loadingRecommended ? (
          <Loader />
        ) : errorRecommended ? (
          <Message variant="danger">{errorRecommended}</Message>
        ) : (
          usersRecommended.map((user) => (
            <article className="followRecommendation__user mb-1" key={user._id}>
              <ProfileInfo
                name={user.name}
                username={user.name}
                image={user.image}
                id={user._id}
                isAdmin={user.isAdmin}
                isVerified={user.isVerified}
              />
              <Link to={`/profile/${user._id}`} className="primary-btn">
                Follow
              </Link>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default FollowRecommendation;
