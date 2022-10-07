import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { editProfile } from '../actions/userActions';
import Head from '../components/Head';
import Layout from '../components/Layout';
import TopBar from '../components/TopBar';
import {
  EDIT_PROFILE_RESET,
  USER_LOGIN_SUCCESS,
} from '../constants/userConstants';
import toast from 'react-hot-toast';

const ProfileEditScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [image, setImage] = useState('');
  const [cover, setCover] = useState('');
  const [password, setPassword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { user } = userProfile;

  const editProfileData = useSelector((state) => state.editProfile);
  const { loading, userInfo: newUserInfo, success, error } = editProfileData;

  useEffect(() => {
    if (userInfo.isGuest) {
      history.push('/');
    }
    setName(user.name || userInfo.name);
    setUsername(user.username || userInfo.username);
    setBio(user.bio || userInfo.bio);
    setImage(user.image || userInfo.image);
    setCover(user.cover || userInfo.cover);

    if (success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: newUserInfo });
      history.push(`/profile/${newUserInfo.username}`);
    }

    return () => {
      dispatch({ type: EDIT_PROFILE_RESET });
    };
  }, [history, userInfo, success, dispatch, newUserInfo, user]);

  const uploadImage = async (img, imageType) => {
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(`/api/upload`, { data: [img] }, config);
      if (imageType === 'profile') {
        setImage(data[0].secure_url);
      } else {
        setCover(data[0].secure_url);
      }
      setUploading(false);
    } catch (err) {
      console.error(error);
      setUploadError(error);
      setUploading(false);
    }
  };

  const imageUploadHandler = async (e, imageType) => {
    const files = e.target.files;

    if (files.length > 1) {
      return toast.error('Cannot upload more than 1 photo.');
    }
    for (const file of files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        uploadImage(reader.result, imageType);
      };
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProfile(
        user._id || userInfo._id,
        name,
        username,
        bio,
        image,
        cover,
        password
      )
    );
  };
  return (
    <div className="profileEditScreen">
      <Head title="Edit Your Profile" />
      <Layout>
        <section className="middle-section">
          {loading ? (
            <Loader />
          ) : (
            <>
              <TopBar title="Edit Your Profile" />
              {error && <Message variant="danger">{error}</Message>}
              {uploading && (
                <div>
                  <Loader />
                  <h3 className="heading-sm text-centered mb-2">Uploading</h3>
                </div>
              )}
              {uploadError && <Message variant="danger">{error}</Message>}
              <form onSubmit={submitHandler} autoComplete="off">
                <div className="profileEditScreen__pictures">
                  <div className="profileEditScreen__cover">
                    <div className="profileEditScreen__profileEdit">
                      <label htmlFor="cover-file">
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
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                      <input
                        type="file"
                        id="cover-file"
                        placeholder="Upload Image"
                        onChange={(e) => imageUploadHandler(e, 'cover')}
                        hidden
                      />
                    </div>
                    <img src={cover} alt="cover" />
                  </div>
                  <div className="profileEditScreen__profile">
                    <div className="profileEditScreen__profileEdit">
                      <label htmlFor="profile-file">
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
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </label>
                      <input
                        type="file"
                        id="profile-file"
                        placeholder="Upload Image"
                        onChange={(e) => imageUploadHandler(e, 'profile')}
                        hidden
                      />
                    </div>
                    <img src={image} alt="profile" />
                  </div>
                </div>
                <div className="form__group mt-2">
                  <label htmlFor="name" className="form__label mb-1">
                    Name
                  </label>
                  <input
                    name="name"
                    className="form__input form__input-alt"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form__group mt-2">
                  <label htmlFor="username" className="form__label mb-1">
                    Username
                  </label>
                  <input
                    name="username"
                    className="form__input form__input-alt"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form__group mt-2">
                  <label htmlFor="bio" className="form__label mb-1">
                    Bio
                  </label>
                  <input
                    name="bio"
                    className="form__input form__input-alt"
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                </div>

                <div className="form__group mt-2">
                  <label htmlFor="password" className="form__label mb-1">
                    Change Password
                  </label>
                  <input
                    name="password"
                    placeholder="Leave blank to keep the same password"
                    className="form__input form__input-alt"
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="separator m-2">
                  Or, paste image links instead!
                </div>
                <div className="form__group">
                  <label htmlFor="profile picture" className="form__label mb-1">
                    Profile Picture
                  </label>
                  <input
                    name="profile picture"
                    className="form__input form__input-alt"
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="form__group mt-2">
                  <label htmlFor="cover picture" className="form__label mb-1">
                    Cover Picture
                  </label>
                  <input
                    name="cover picture"
                    className="form__input form__input-alt"
                    type="text"
                    value={cover}
                    onChange={(e) => setCover(e.target.value)}
                  />
                </div>

                <button className="form__submitBtn mt-3" type="submit">
                  Save
                </button>
              </form>
            </>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default ProfileEditScreen;
