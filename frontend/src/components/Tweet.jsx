import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTweet, likeTweet } from "../actions/tweetActions";
import { getUsername } from "../utils/getUsername";
import { getTimeFromNow } from "../utils/getTimeFromNow";
import { ReactComponent as Verified } from "../assets/verified.svg";
import ProfilePicHolder from "./ProfilePicHolder";

const Tweet = ({ tweet, userInfo, major, rounded = true, shadow = true }) => {
  const [like, setLike] = useState(tweet.isLiked);
  const [popup, setPopup] = useState(false);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);
  const [preview, setPreview] = useState("");

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
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <article
      className={`tweet ${shadow && "shadow"} ${rounded && "rounded-2"} ${
        major && "tweet-major"
      }`}
    >
      {preview && (
        <>
          <div
            onClick={() => setPreview(false)}
            className="tweet__backDrop tweet__backDrop-dark"
          ></div>
          <span
            onClick={() => setPreview(false)}
            className="profileMain__previewClose"
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

          <img
            className="profileMain__popupImage profileMain__popupImage-cover"
            src={preview}
            alt="preview"
          />
        </>
      )}
      {popup && (
        <>
          <div
            onClick={() => setPopup(false)}
            className="tweet__backDrop"
          ></div>

          <div className="tweet__popup">
            <p onClick={tweetDeleteHandler} className="tweet__popOption">
              <i className="fas fa-trash-alt mr-1"></i>Delete
            </p>
          </div>
        </>
      )}

      <div className="tweet__profilePic">
        <Link
          to={
            userInfo._id === tweet.user._id
              ? "/profile"
              : `/profile/${tweet.user._id}`
          }
        >
          <ProfilePicHolder src={tweet.user.image} />
        </Link>
      </div>
      <div className="tweet__details">
        <section className="tweet__info">
          <Link
            to={
              userInfo._id === tweet.user._id
                ? "/profile"
                : `/profile/${tweet.user._id}`
            }
            className="tweet__username username-text"
          >
            {tweet.user.name}
            {tweet.user.isVerified && (
              <Verified title="Verifed User" className="verified-badge" />
            )}
          </Link>

          <p className="subtitle-text">
            {tweet.user.name && getUsername(tweet.user.name)}
          </p>
          <span className="subtitle-text">.</span>
          <span className="subtitle-text">
            {getTimeFromNow(tweet.createdAt)}
          </span>
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
              <pre className="tweet__content">{tweet.tweetContent}</pre>
            )}
            {tweet?.tweetContent && <div className="pt-2"></div>}
            {tweet.images && tweet.images.length > 0 && (
              <div className="tweetComposer__imageHolder mb-2">
                {tweet.images.map((image) => (
                  <img
                    className={
                      "tweetComposer__uploadedImage" +
                      (tweet.images.length === 1 ? "-full" : "")
                    }
                    onClick={() => setPreview(image.secure_url)}
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
            <Link to={`/tweets/${tweet._id}`}>
              {tweet?.tweetContent && (
                <pre className="tweet__content">{tweet.tweetContent}</pre>
              )}

              {tweet?.tweetContent && <div className="pt-2"></div>}
            </Link>
            {tweet?.images.length > 0 && (
              <div className="tweetComposer__imageHolder mb-2">
                {tweet.images.map((image) => (
                  <img
                    className={
                      "tweetComposer__uploadedImage" +
                      (tweet.images.length === 1 ? "-full" : "")
                    }
                    key={image.public_id}
                    onClick={() => setPreview(image.secure_url)}
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
                like ? "fas fa-heart tweet__actionIcon-liked" : "far fa-heart"
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
