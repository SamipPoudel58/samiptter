import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteTweet, likeTweet } from '../actions/tweetActions';
import { getUsername } from '../utils/getUsername';
import { getTimeFromNow } from '../utils/getTimeFromNow';
import { ReactComponent as Verified } from '../assets/verified.svg';
import ProfilePicHolder from './ProfilePicHolder';
import { previewImage } from '../actions/uiActions';
import useClickOutside from '../hooks/useClickOutside';
import { generateLinks } from '../utils/generateLinks';
import { EDIT_TWEET_SETUP } from '../constants/tweetConstants';
import Indicator from './Indicator';

const Tweet = ({ tweet, userInfo, major, rounded = true, shadow = true }) => {
  const [like, setLike] = useState(tweet.isLiked);
  const [popup, setPopup] = useState(false);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);

  const popupRef = useRef();

  useClickOutside(popupRef, () => {
    setPopup(false);
  });

  const dispatch = useDispatch();
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    setLike(tweet.isLiked);
    setNumLikes(tweet.numLikes);
  }, [tweet.isLiked, tweet.numLikes]);

  const likeHandler = () => {
    dispatch(likeTweet(tweet._id));
    setLike((prev) => !prev);
    like
      ? setNumLikes((prevNum) => prevNum - 1)
      : setNumLikes((prevNum) => prevNum + 1);
  };

  const tweetDeleteHandler = () => {
    setPopup(false);
    dispatch(deleteTweet(tweet._id));
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  const tweetEditHandler = () => {
    setPopup(false);
    dispatch({ type: EDIT_TWEET_SETUP, payload: tweet });
  };

  return (
    <article
      onClick={(e) => {
        const clickElements = [
          'tweet',
          'tweet__content',
          'tweet__info',
          'tweet__divider',
        ];
        clickElements.includes(e.target.classList[0]) &&
          history.push(`/tweets/${tweet._id}`);
      }}
      className={`tweet ${shadow && 'shadow'} ${rounded && 'rounded-2'} ${
        major && 'tweet-major'
      }`}
    >
      {popup && (
        <div ref={popupRef} className="tweet__popup">
          <p onClick={tweetEditHandler} className="tweet__popOption">
            <i className="fas fa-pencil-alt mr-1"></i>Edit
          </p>
          <p
            onClick={tweetDeleteHandler}
            className="tweet__popOption tweet__popOption-delete"
          >
            <i className="fas fa-trash-alt mr-1"></i>Delete
          </p>
        </div>
      )}

      <div className="tweet__profilePic">
        <Link to={`/profile/${tweet.user.username}`}>
          <ProfilePicHolder src={tweet.user.image} />
        </Link>
      </div>
      <div className="tweet__details">
        <section className="tweet__info">
          <Link
            to={`/profile/${tweet.user.username}`}
            className="tweet__username username-text"
          >
            {tweet.user.name}
            {tweet.user.isVerified && (
              <Verified title="Verifed User" className="verified-badge" />
            )}
          </Link>

          <p className="subtitle-text">
            {getUsername(tweet.user.username || '') ||
              (tweet.user.name && getUsername(tweet.user.name))}
          </p>
          <span className="subtitle-text">.</span>
          <span className="subtitle-text">
            {getTimeFromNow(tweet.createdAt)}
          </span>
          {tweet.isEdited && <Indicator text="Edited" />}

          {(tweet.user._id === userInfo._id || userInfo.isAdmin) && (
            <i
              onClick={() => setPopup(true)}
              className="fas fa-ellipsis-h tweet__optionIcon"
            ></i>
          )}
        </section>

        {major ? (
          <>
            {tweet?.tweetContent && (
              <p
                className="tweet__content"
                dangerouslySetInnerHTML={{
                  __html: generateLinks(tweet.tweetContent),
                }}
              ></p>
            )}
            {tweet?.tweetContent && <div className="pt-2"></div>}
            {tweet.images && tweet.images.length > 0 && (
              <div className="tweetComposer__imageHolder mb-2">
                {tweet.images.map((image) => (
                  <img
                    className={
                      'tweetComposer__uploadedImage' +
                      (tweet.images.length === 1 ? '-full' : '')
                    }
                    onClick={() =>
                      dispatch(previewImage(image.secure_url, 'cover'))
                    }
                    key={image.public_id}
                    src={image.secure_url}
                    alt="user upload"
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div>
              {tweet?.tweetContent && (
                <p
                  className="tweet__content"
                  // onClick={e => e.stopPropagation()}
                  dangerouslySetInnerHTML={{
                    __html: generateLinks(tweet.tweetContent),
                  }}
                ></p>
              )}

              {tweet?.tweetContent && (
                <div className="tweet__divider pt-2"></div>
              )}
            </div>
            {tweet?.images.length > 0 && (
              <div className="tweetComposer__imageHolder mb-2">
                {tweet.images.map((image) => (
                  <img
                    className={
                      'tweetComposer__uploadedImage' +
                      (tweet.images.length === 1 ? '-full' : '')
                    }
                    key={image.public_id}
                    onClick={() =>
                      dispatch(previewImage(image.secure_url, 'cover'))
                    }
                    src={image.secure_url}
                    alt="user-upload"
                  />
                ))}
              </div>
            )}
          </>
        )}
        <section className="tweet__actions">
          <div className="tweet__like" onClick={likeHandler}>
            <i
              className={`tweet__actionIcon fs-18 ${
                like ? 'fas fa-heart tweet__actionIcon-liked' : 'far fa-heart'
              }`}
            ></i>
            <span>{numLikes}</span>
          </div>

          <Link to={`/tweets/${tweet._id}`} className="tweet__comment">
            <i className="tweet__actionIcon tweet__actionIcon-comment far fa-comment-alt"></i>
            <span>{tweet.numComments}</span>
          </Link>
        </section>
      </div>
    </article>
  );
};

export default Tweet;
