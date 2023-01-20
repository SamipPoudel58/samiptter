import React from 'react';
import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

const UserSkeleton = () => {
  return (
    <div className="skeleton-wrapper user-skeleton">
      <Skeleton type="avatar" />
      <div className="user-skeleton__content">
        <Skeleton type="title" />
        <Skeleton type="subtext" />
      </div>
      <Shimmer />
    </div>
  );
};

export default UserSkeleton;
