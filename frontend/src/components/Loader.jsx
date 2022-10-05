import React from 'react';

const Loader = ({ mini = false }) => {
  return (
    <div className={`spinner ${mini ? 'spinner-mini' : ''}`}>
      <div className={`circle ${mini ? 'circle-mini' : ''}`}></div>
    </div>
  );
};

export default Loader;
