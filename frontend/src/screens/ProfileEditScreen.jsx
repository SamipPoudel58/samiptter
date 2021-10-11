import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { editProfile } from "../actions/userActions";
import Head from "../components/Head";
import Layout from "../components/Layout";
import TopBar from "../components/TopBar";
import {
  EDIT_PROFILE_RESET,
  USER_LOGIN_SUCCESS,
} from "../constants/userConstants";

const ProfileEditScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [cover, setCover] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { user } = userProfile;

  const editProfileData = useSelector((state) => state.editProfile);
  const { loading, userInfo: newUserInfo, success, error } = editProfileData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      setName(user.name);
      setBio(user.bio || "");
      setImage(user.image);
      setCover(user.cover);
    }

    if (success) {
      dispatch({ type: USER_LOGIN_SUCCESS, payload: newUserInfo });
      history.push("/profile");
    }
  }, [history, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    // dispatch edit profile action
    dispatch(editProfile(name, bio, image, cover, password));
  };
  return (
    <div className="profileEditScreen">
      <Head title="Edit Your Profile" />
      <Layout>
        <section className="middle-section">
          <TopBar title="Edit Your Profile" />
          {error && <Message variant="danger">{error}</Message>}
          {message && <Message variant="danger">{message}</Message>}
          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            <div className="form__group mt-2">
              <label className="form__label mb-1">Name</label>
              <input
                className="form__input form__input-alt"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__group mt-2">
              <label className="form__label mb-1">Bio</label>
              <input
                className="form__input form__input-alt"
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
            <div className="form__group mt-2">
              <label className="form__label mb-1">Profile Picture</label>
              <input
                className="form__input form__input-alt"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <div className="form__group mt-2">
              <label className="form__label mb-1">Cover Picture</label>
              <input
                className="form__input form__input-alt"
                type="text"
                value={cover}
                onChange={(e) => setCover(e.target.value)}
              />
            </div>
            <div className="form__group mt-2">
              <label className="form__label mb-1">Change Password</label>
              <input
                className="form__input form__input-alt"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="form__submitBtn mt-3" type="submit">
              Save
            </button>
          </form>
        </section>
      </Layout>
    </div>
  );
};

export default ProfileEditScreen;
