import React from 'react';
import Shimmer from './Shimmer';
import Skeleton from './Skeleton';
import TweetSkeleton from './TweetSkeleton';

const ProfileSkeleton = () => {
  return (
    <div className="skeleton-wrapper profile-skeleton">
      <div>
        <Skeleton type="coverImg" />
        <div className="skeleton-profileDetails">
          <div className="skeleton-profilePic">
            <div className="skeleton-profileImg"></div>
          </div>
          <div className="skeleton-profileInfo">
            <Skeleton type="title" />
            <Skeleton type="subtext" />
            <Skeleton type="text" />
          </div>
        </div>
      </div>
      <div className="">
        {[1, 2, 3, 4].map((num) => (
          <TweetSkeleton key={num} />
        ))}
      </div>
      <Shimmer />
    </div>
  );
};

export default ProfileSkeleton;
