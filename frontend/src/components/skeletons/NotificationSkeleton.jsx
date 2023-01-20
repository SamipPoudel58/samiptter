import React from 'react';
import Shimmer from './Shimmer';
import Skeleton from './Skeleton';

const NotificationSkeleton = () => {
  return (
    <div className="skeleton-wrapper notification-skeleton">
      <Skeleton type="avatar" />
      <div className="tweet-skeleton__content">
        <Skeleton type="text" />
        <Skeleton type="subtext" />
      </div>
      <Shimmer />
    </div>
  );
};

export default NotificationSkeleton;
