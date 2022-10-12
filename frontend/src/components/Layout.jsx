import React from 'react';
import SideNav from './SideNav';
import MobileNav from './MobileNav';
import { useSelector, useDispatch } from 'react-redux';
import FollowRecommendation from '../components/FollowRecommendation';

import PreviewImage from './PreviewImage';
import useEventListener from '../hooks/useEventListener';
import { changeTheme } from '../actions/uiActions';
import TweetComposer from './TweetComposer';
import { EDIT_TWEET_SETUP } from '../constants/tweetConstants';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
  const preview = useSelector((state) => state.preview);
  const { previewSrc, previewType } = preview;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  const tweetEdit = useSelector((state) => state.tweetEdit);
  const {
    success: successTweetEdit,
    tweetToEdit,
    tweet: editedTweet,
  } = tweetEdit;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (successTweetEdit) {
      history.push(`/tweets/${editedTweet._id}`);
    }
  }, [successTweetEdit, editedTweet, history]);

  useEventListener(
    'keydown',
    (e) => {
      const key = e.key;

      if (['textarea', 'input'].includes(e.target.tagName.toLowerCase()))
        return;

      switch (key) {
        case 'd':
          dispatch(changeTheme(!darkMode));
          break;
        default:
          break;
      }
    },
    window
  );

  return (
    <>
      {previewSrc && <PreviewImage src={previewSrc} type={previewType} />}
      <Toaster
        toastOptions={
          darkMode
            ? {
                style: {
                  fontSize: '1.6rem',
                  background: '#333',
                  color: '#fff',
                },
              }
            : {
                style: {
                  fontSize: '1.6rem',
                },
              }
        }
      />
      <SideNav />
      <MobileNav />
      {children}
      <section className="rightNav__wrapper">
        <div className="rightNav">
          <FollowRecommendation />

          <a
            href="https://github.com/SamipPoudel58/samiptter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase">
              <p className="rightNav__showcaseIntro">
                This project is open-sourced on github.
              </p>
              <p className="rightNav__showcaseLink">Check it out &rarr;</p>
              <img
                className="rightNav__showcaseImage"
                src="/images/github.png"
                alt="github logo"
              />
            </article>
          </a>

          <a
            href="https://samippoudel.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase rightNav__showcase-creator">
              <p className="rightNav__showcaseIntro rightNav__showcaseIntro-creator">
                Hi! I am Samip. Check out my other projects.
              </p>
              <p className="rightNav__showcaseLink rightNav__showcaseLink-creator">
                See More &rarr;
              </p>
              <img
                className="rightNav__showcaseImage rightNav__showcaseImage-creator"
                src="/images/profile.jpg"
                alt="profile logo"
              />
            </article>
          </a>
        </div>
      </section>

      {tweetToEdit && (
        <>
          <div
            onClick={() => dispatch({ type: EDIT_TWEET_SETUP, payload: null })}
            className="previewImage__backDrop previewImage__backDrop-dark"
          ></div>
          <span
            onClick={() => dispatch({ type: EDIT_TWEET_SETUP, payload: null })}
            className="previewImage__previewClose"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <div className="tweetComposer-edit">
            <TweetComposer buttonText="Edit" />
          </div>
        </>
      )}
    </>
  );
};

export default Layout;
