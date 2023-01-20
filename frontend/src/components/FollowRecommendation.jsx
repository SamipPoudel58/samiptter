import React, { useEffect } from 'react';
import { recommendUsers } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';
import ProfileInfo from './ProfileInfo';
import UserSkeleton from './skeletons/UserSkeleton';

const FollowRecommendation = () => {
  const dispatch = useDispatch();

  const getRecommendedUsers = useSelector((state) => state.getRecommendedUsers);
  let {
    loading: loadingRecommended,
    error: errorRecommended,
    users: usersRecommended,
  } = getRecommendedUsers;

  useEffect(() => {
    if (usersRecommended?.length === 0) {
      dispatch(recommendUsers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          [...Array(3).keys()].map((num) => <UserSkeleton key={num} />)
        ) : errorRecommended ? (
          <Message variant="danger">{errorRecommended}</Message>
        ) : (
          usersRecommended?.map((user) => (
            <article className="followRecommendation__user mb-1" key={user._id}>
              <ProfileInfo
                name={user.name}
                username={user.username}
                image={user.image}
                id={user._id}
                isAdmin={user.isAdmin}
                isVerified={user.isVerified}
              />
              <Link to={`/profile/${user.username}`} className="primary-btn">
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
