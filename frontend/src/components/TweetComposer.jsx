import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, createTweet, editTweet } from '../actions/tweetActions';
import Loader from './Loader';
import Message from './Message';
import ProfilePicHolder from './ProfilePicHolder';

const TweetComposer = ({ buttonText, tweet }) => {
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tweetEdit = useSelector((state) => state.tweetEdit);
  const { loading: tweetEditLoading, tweetToEdit } = tweetEdit;

  useEffect(() => {
    if (buttonText === 'Edit' && tweetToEdit) {
      setText(tweetToEdit.tweetContent);
      setImages(tweetToEdit.images);
    }
  }, [tweetToEdit, buttonText]);

  const uploadImages = async (imgs) => {
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // this is for editing tweet to check if image is already uploaded to cloudinary
      const cloudinaryImages = imgs.filter((img) => img.secure_url);
      const imagesToUpload = imgs.filter((img) => !img.secure_url);

      const { data } = await axios.post(
        `/api/upload`,
        { data: imagesToUpload },
        config
      );

      buttonText === 'Edit'
        ? dispatch(
            editTweet({
              id: tweetToEdit._id,
              tweet: {
                tweetContent: text,
                images: [...cloudinaryImages, ...data],
              },
            })
          )
        : dispatch(createTweet({ tweetContent: text, images: data }));

      setUploading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadFileHandler = (e) => {
    const files = e.target.files;

    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImages((prevValue) => [...prevValue, reader.result]);
      };
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonText === 'Comment') {
      return dispatch(createComment(tweet._id, { commentContent: text }));
    }
    if (text === '' && images.length === 0) {
      return;
    }
    if (images.length > 0) {
      uploadImages(images);
    } else {
      buttonText === 'Edit'
        ? dispatch(
            editTweet({
              id: tweetToEdit._id,
              tweet: {
                tweetContent: text,
                images: [],
              },
            })
          )
        : dispatch(createTweet({ tweetContent: text, images: [] }));
    }

    setImages([]);
    setError('');
    setText('');
  };

  const inputPlaceholder = {
    Post: "What's happening?",
    Edit: 'Edit your post...',
    Comment: 'Write a comment...',
  };

  return (
    <div className="tweetComposer shadow">
      <div className="tweetComposer__leftCol">
        {userInfo && <ProfilePicHolder src={userInfo.image} />}
      </div>
      <div className="tweetComposer__rightCol">
        <form className="tweetComposer__form" onSubmit={submitHandler}>
          <textarea
            placeholder={inputPlaceholder[buttonText] || "What's happening"}
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
                images.map((image, index) => (
                  <div
                    key={index}
                    className={
                      'tweetComposer__composedImageWrap' +
                      (images.length === 1 ? '-full' : '')
                    }
                  >
                    <span
                      onClick={() => {
                        setImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="tweetComposer__removeImage"
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
                      className="tweetComposer__composedImage"
                      key={index}
                      src={image.secure_url || image}
                      alt="user upload"
                    />
                  </div>
                ))}
            </div>
          )}
          <div className="tweetComposer__actions">
            {buttonText !== 'Comment' && (
              <div className="tweetComposer__uploadBtnHolder">
                <label
                  className="tweetComposer__uploadBtn"
                  htmlFor={'image-file-' + buttonText}
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
                  id={'image-file-' + buttonText}
                  className="form__input-file"
                  placeholder="Upload Image"
                  onChange={uploadFileHandler}
                  hidden
                />
              </div>
            )}
            <button
              disabled={!!tweetEditLoading}
              className="primary-btn"
              type="submit"
            >
              {tweetEditLoading ? <Loader mini /> : buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TweetComposer;
