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
            {tweet.user.isVerified && <Verified className="verified-badge" />}
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
            <section className="tweet__content">{tweet.tweetContent}</section>
            <div className="tweetComposer__imageHolder mb-2">
              {tweet.images &&
                tweet.images.length > 0 &&
                tweet.images.map((image) => (
                  <img
                    className={
                      "tweetComposer__uploadedImage" +
                      (tweet.images.length === 1 ? "-full" : "")
                    }
                    key={image.public_id}
                    src={image.secure_url}
                    alt="user upload"
                  />
                ))}
            </div>
          </>
        ) : (
          <Link to={`/tweets/${tweet._id}`}>
            <section className="tweet__content">{tweet.tweetContent}</section>

            {tweet?.images.length > 0 && (
              <div className="tweetComposer__imageHolder mb-2">
                {tweet.images.map((image) => (
                  <img
                    className={
                      "tweetComposer__uploadedImage" +
                      (tweet.images.length === 1 ? "-full" : "")
                    }
                    key={image.public_id}
                    src={image.secure_url}
                    alt="user-upload"
                  />
                ))}
              </div>
            )}
          </Link>
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
