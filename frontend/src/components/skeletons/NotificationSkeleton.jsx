import React from 'react';
import Skeleton from './Skeleton';

const NotificationSkeleton = () => {
  return (
    <div className="skeleton-wrapper notification-skeleton">
      <Skeleton type="avatar" />
      <div className="tweet-skeleton__content">
        <Skeleton type="text" />
        <Skeleton type="subtext" />
      </div>
    </div>
  );
};

export default NotificationSkeleton;
