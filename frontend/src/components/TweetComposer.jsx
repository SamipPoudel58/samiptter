import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment, createTweet } from "../actions/tweetActions";
import Loader from "./Loader";
import Message from "./Message";
import ProfilePicHolder from "./ProfilePicHolder";
import toast from "react-hot-toast";

const TweetComposer = ({ buttonText, tweet, setBackDrop }) => {
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    setText("");
    if (buttonText === "Comment") {
      return dispatch(createComment(tweet._id, { commentContent: text }));
    }
    if (text === "" && images.length === 0) {
      return;
    }
    dispatch(createTweet({ tweetContent: text, images: images }));
    setImages([]);
    setError("");
    if (setBackDrop) {
      setBackDrop(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    if (files.length > 4) {
      return toast.error("Cannot upload more than 4 photos.");
    }
    for (const file of files) {
      formData.append("image", file);
    }

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/upload`, formData, config);

      setImages(data);

      setUploading(false);
    } catch (error) {
      console.error(error);
      setError(error);
      setUploading(false);
    }
  };
  return (
    <div className="tweetComposer shadow">
      <div className="tweetComposer__leftCol">
        {userInfo && <ProfilePicHolder src={userInfo.image} />}
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
          {uploading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <div className="tweetComposer__imageHolder pl-1">
              {images.length > 0 &&
                images.map((image) => (
                  <img
                    className={
                      "tweetComposer__uploadedImage" +
                      (images.length === 1 ? "-full" : "")
                    }
                    key={image.public_id}
                    src={image.secure_url}
                    alt="user upload"
                  />
                ))}
            </div>
          )}
          <div className="tweetComposer__actions">
            {buttonText !== "Comment" && (
              <div className="tweetComposer__uploadBtnHolder">
                <label
                  className="tweetComposer__uploadBtn"
                  htmlFor="image-file"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </label>
                <input
                  multiple
                  type="file"
                  id="image-file"
                  className="form__input-file"
                  placeholder="Upload Image"
                  onChange={uploadFileHandler}
                  hidden
                />
              </div>
            )}
            <button className="primary-btn" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetComposer;
