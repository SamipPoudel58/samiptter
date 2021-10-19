import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likeComment, deleteComment } from "../actions/tweetActions";
import { getTimeFromNow } from "../utils/getTimeFromNow";
import { ReactComponent as Verified } from "../assets/verified.svg";

const Comment = ({ tweet, userInfo, mainTweetId }) => {
  const [like, setLike] = useState(tweet.isLiked);
  const [numLikes, setNumLikes] = useState(tweet.numLikes);

  const dispatch = useDispatch();

  useEffect(() => {
    setLike(tweet.isLiked);
    setNumLikes(tweet.numLikes);
  }, [tweet.isLiked, tweet.numLikes]);

  const likeHandler = () => {
    dispatch(likeComment(mainTweetId, tweet._id));
    setLike((prev) => !prev);
    like
      ? setNumLikes((prevNum) => prevNum - 1)
      : setNumLikes((prevNum) => prevNum + 1);
  };

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteComment(mainTweetId, tweet._id));
    }
  };
  return (
    <article className="comment border-t">
      <div className="tweet">
        <div className="tweet__profilePic">
          <img
            className="profile-image"
            src={tweet.user.image}
            alt={"profile picture of" + tweet.user.name}
          />
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
              {tweet.user.name &&
                "@" + tweet.user.name.toLowerCase().replace(" ", "")}
            </p>
            <span className="subtitle-text">.</span>
            <span className="subtitle-text">
              {getTimeFromNow(tweet.createdAt)}
            </span>
          </section>

          <section className="tweet__content">{tweet.tweetContent}</section>

          <section className="tweet__actions">
            <div className="tweet__like" onClick={likeHandler}>
              <i
                className={`tweet__actionIcon fs-18 ${
                  like ? "fas fa-heart tweet__actionIcon-liked" : "far fa-heart"
                }`}
              ></i>
              <span>{numLikes}</span>
            </div>

            {tweet.user._id.toString() === userInfo._id && (
              <div onClick={deleteHandler} className="tweet__comment">
                <i className="tweet__actionIcon tweet__actionIcon-comment far fa-trash-alt"></i>
              </div>
            )}
          </section>
        </div>
      </div>
    </article>
  );
};

export default Comment;
