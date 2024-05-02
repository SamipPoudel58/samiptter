import React from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { useDispatch } from 'react-redux';

const GuestNotice = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  return (
    <div className="notice">
      <div className="notice__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </div>
      <div className="notice__details">
        <p className="notice__description">
          {' '}
          You are currently using a guest account and are limited to handful of
          features. To create posts, comment, edit profile and enjoy the whole
          experience{' '}
          <span
            className="notice__links"
            onClick={() => {
              dispatch(logout()).then(() => {
                history.push('/register');
              });
            }}
            role="button"
          >
            Create an account
          </span>{' '}
          or{' '}
          <span
            className="notice__links"
            onClick={() => {
              dispatch(logout()).then(() => {
                history.push('/login');
              });
            }}
            role="button"
          >
            Login
          </span>{' '}
          if you already have one.{' '}
        </p>
      </div>
    </div>
  );
};

export default GuestNotice;
