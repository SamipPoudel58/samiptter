import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, createTweet } from "../actions/tweetActions";

const TweetComposer = ({ buttonText, tweet, setBackDrop }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonText === "Comment") {
      return dispatch(createComment(tweet._id, { commentContent: text }));
    }
    dispatch(createTweet({ tweetContent: text }));
    if (setBackDrop) {
      setBackDrop(false);
    }
  };
  return (
    <div className="tweetComposer shadow">
      <div className="tweetComposer__leftCol">
        {userInfo && (
          <img
            className="profile-image"
            src={userInfo.image}
            alt={userInfo.name}
          />
        )}
      </div>
      <div className="tweetComposer__rightCol">
        <form className="tweetComposer__form" onSubmit={submitHandler}>
          <input
            placeholder={
              buttonText === "Comment"
                ? "Write a comment..."
                : "What's happening?"
            }
            type="text"
            className="tweetComposer__input"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="primary-btn" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TweetComposer;
