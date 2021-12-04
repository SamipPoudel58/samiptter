import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Head from "../components/Head";

import {
  getProfile,
  addFriendAction,
  toggleVerify,
} from "../actions/userActions";
import TopBar from "../components/TopBar";
import { getUsername } from "../utils/getUsername";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  ADD_FRIEND_RESET,
  EDIT_PROFILE_RESET,
  TOGGLE_VERIFY_RESET,
} from "../constants/userConstants";
import { ReactComponent as Verified } from "../assets/verified.svg";
import ProfilePicHolder from "../components/ProfilePicHolder";
import { previewImage } from "../actions/uiActions";

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { loading, error, tweets, user } = userProfile;

  const addFriend = useSelector((state) => state.addFriend);
  let { error: followError, success: followSuccess } = addFriend;

  const editProfileData = useSelector((state) => state.editProfile);
  const { success: editProfileSuccess } = editProfileData;

  const toggleVerifyData = useSelector((state) => state.toggleVerify);
  const { success: toggleVerifySuccess } = toggleVerifyData;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  useEffect(() => {
    dispatch(getProfile(match.params.id || userInfo._id));

    if (editProfileSuccess) {
      toast.success("Profile Edited Successfully");
      dispatch({ type: EDIT_PROFILE_RESET });
    }

    if (toggleVerifySuccess) {
      toast.success("Verification Changed Successfully");
      dispatch({ type: TOGGLE_VERIFY_RESET });
    }
    if (followSuccess) {
      dispatch({ type: ADD_FRIEND_RESET });
    }
  }, [
    history,
    userInfo,
    dispatch,
    match.params.id,
    editProfileSuccess,
    toggleVerifySuccess,
    followSuccess,
  ]);

  const followHandler = (e) => {
    e.preventDefault();
    dispatch(addFriendAction(user._id));
    // dispatch(getProfile(match.params.id || userInfo._id));
  };
  return (
    <div className="profileScreen">
      <Head title={`${user && user.name ? user.name : "Profile"}`} />
      <Layout>
        <Toaster
          toastOptions={
            darkMode
              ? {
                  style: {
                    fontSize: "1.6rem",
                    background: "#333",
                    color: "#fff",
                  },
                }
              : {
                  style: {
                    fontSize: "1.6rem",
                  },
                }
          }
        />

        <section className="newsFeed">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{"Profile Not Found :("}</Message>
          ) : (
            <>
              <TopBar title={user.name} />
              {/* {userInfo.isGuest && <Notice />} */}
              <div className="profileMain mt-2">
                <div className="profileMain__cover">
                  <img
                    onClick={() => dispatch(previewImage(user.cover, "cover"))}
                    src={user.cover}
                    alt={`${user.name}'s cover`}
                  />
                </div>
                <div className="profileMain__details shadow">
                  <div className="profileMain__profilePic">
                    <div
                      onClick={() =>
                        dispatch(previewImage(user.image, "profile"))
                      }
                    >
                      <ProfilePicHolder src={user.image} large={true} />
                    </div>
                  </div>

                  {match.params.id && (
                    <button
                      onClick={followHandler}
                      className={`profileMain__followBtn ${
                        user && user.isFriend
                          ? "primary-btn-alt"
                          : "primary-btn"
                      }`}
                    >
                      {user && user.isFriend ? "Unfollow" : "Follow"}
                    </button>
                  )}

                  {history.location.pathname === "/profile" &&
                    !userInfo.isGuest && (
                      <Link
                        to="/profile-edit"
                        className="profileMain__followBtn primary-btn-alt"
                      >
                        Edit
                      </Link>
                    )}
                  <h3 className="profileMain__userName heading-md text-centered mt-1">
                    {user.name}{" "}
                    {user.isVerified && (
                      <Verified
                        title="Verfied User"
                        className="verified-badge verified-badge-lg"
                      />
                    )}
                  </h3>
                  <p className="text-centered subtitle-text">
                    {user.name && getUsername(user.name)}
                  </p>
                  <p className="paragraph text-centered mt-1">{user.bio}</p>
                  <p className="profileMain__stats mt-1">
                    <span>{user.friends.length}</span>Friends
                  </p>
                  {followError && (
                    <Message variant="danger">{followError}</Message>
                  )}
                </div>
              </div>

              {/* Admin Panel */}
              {userInfo.isAdmin && (
                <div className="profileMain__adminPanel mt-2">
                  <h3 className="username-text">Admin Panel</h3>

                  <div className="profileMain__adminBtns mt-1">
                    <button
                      onClick={() => dispatch(toggleVerify(user._id))}
                      className="primary-btn"
                    >
                      {user.isVerified ? "Unverify User" : "Verify User"}
                    </button>

                    <Link to="/profile-edit" className="primary-btn">
                      Edit
                    </Link>
                  </div>
                </div>
              )}

              <div className="profileTweets mt-2 shadow ">
                <div className="profileTweets__header">
                  <div className="profileTweets__icon">
                    <i className="fas fa-newspaper"></i>
                  </div>
                  <h3 className="heading-sm">
                    {tweets.length === 0 ? "No Posts" : `${user.name}'s Posts`}
                  </h3>
                </div>

                <div className="profileTweets__tweets">
                  {tweets.map((tweet) => (
                    <div key={tweet._id} className="border-t">
                      <Tweet
                        userInfo={userInfo}
                        rounded={false}
                        tweet={tweet}
                        shadow={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </Layout>
    </div>
  );
};

export default ProfileScreen;
