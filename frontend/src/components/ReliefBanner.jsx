import React from 'react';

const ReliefBanner = () => {
  return (
    <a
      className="reliefBanner"
      href="https://pmdrf.nchl.com.np/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="reliefBanner__long">
        Nepal is recovering from severe floods. Donate to the Government of
        Nepal Prime Minister&apos;s Disaster Relief Fund
      </span>
      <span className="reliefBanner__short">
        Donate to Nepal flood relief
      </span>
      <svg
        className="reliefBanner__arrow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
};

export default ReliefBanner;
