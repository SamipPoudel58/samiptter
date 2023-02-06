import React from 'react';
import Skeleton from './Skeleton';

const TweetSkeleton = () => {
  return (
    <div className="skeleton-wrapper tweet-skeleton">
      <Skeleton type="avatar" />
      <div className="tweet-skeleton__content">
        <Skeleton type="title" />
        <Skeleton type="text" />
      </div>
    </div>
  );
};

export default TweetSkeleton;
