import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Head from "../components/Head";

import { getProfile, addFriendAction } from "../actions/userActions";
import TopBar from "../components/TopBar";
import { getUsername } from "../utils/getUsername";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { EDIT_PROFILE_RESET } from "../constants/userConstants";

const ProfileScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userProfile);
  let { loading, error, tweets, user } = userProfile;

  const addFriend = useSelector((state) => state.addFriend);
  let { error: followError } = addFriend;

  const editProfileData = useSelector((state) => state.editProfile);
  const { success: editProfileSuccess } = editProfileData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getProfile(match.params.id || userInfo._id));
    }

    if (editProfileSuccess) {
      toast.success("Profile Edited Successfully");
      dispatch({ type: EDIT_PROFILE_RESET });
    }
  }, [history, userInfo, dispatch, match.params.id, editProfileSuccess]);

  const followHandler = (e) => {
    e.preventDefault();
    dispatch(addFriendAction(user._id));
    dispatch(getProfile(match.params.id || userInfo._id));
  };
  return (
    <div className="profileScreen">
      <Head title={`${user.name ? user.name : "Profile"}`} />
      <Layout>
        <Toaster
          toastOptions={{
            style: {
              fontSize: "1.6rem",
            },
          }}
        />
        <section className="middle-section">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <TopBar title={user.name} />
              <div className="profileMain mt-2">
                <div className="profileMain__cover">
                  <img src={user.cover} alt={`${user.name}'s cover`} />
                </div>
                <div className="profileMain__details shadow">
                  <div className="profileMain__profilePic">
                    <img src={user.image} alt={`${user.name}'s profile`} />
                  </div>

                  {match.params.id && !user.isFriend && (
                    <button
                      onClick={followHandler}
                      className="profileMain__followBtn primary-btn"
                    >
                      Follow
                    </button>
                  )}

                  {match.params.id && user.isFriend && (
                    <button
                      onClick={followHandler}
                      className="profileMain__followBtn primary-btn-alt"
                    >
                      Unfollow
                    </button>
                  )}

                  <Link
                    to="/profile-edit"
                    className="profileMain__followBtn primary-btn-alt"
                  >
                    Edit
                  </Link>
                  <h3 className="heading-md text-centered mt-1">{user.name}</h3>
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

    // <Row className="mainRow">
    //   <Col className="firstCol">
    //     <SideNav />
    //   </Col>
    //   {loading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant="danger">{error}</Message>
    //   ) : (
    //     <Col className="newsFeed" md={6}>
    //       <Row className="p-3 u-line">
    //         <BackButton />
    //         <span className="ml-3 go-back-heading">{user.name}</span>
    //       </Row>
    //       <Row className="profileScreen__images">
    //         <Image
    //           className="profileScreen__coverpic"
    //           src={user.cover}
    //           alt={`${user.name} cover photo`}
    //           fluid
    //         />
    //         <Image
    //           className="profileScreen__profilepic"
    //           src={user.image}
    //           alt={`${user.name} profile photo`}
    //           fluid
    //         />
    //       </Row>
    //       <Row className="profileScreen__details">
    //         <h4 className="profileScreen__details-name">{user.name}</h4>
    //         {user.isFriend && <p className="ml-2 text-info">Following</p>}
    //         {followError && <Message variant="danger">{followError}</Message>}

    //         {match.params.id && !user.isFriend && (
    //           <button
    //             onClick={followHandler}
    //             className="profileScreen__follow ml-auto"
    //           >
    //             Follow
    //           </button>
    //         )}
    //         {match.params.id && user.isFriend && (
    //           <button
    //             onClick={followHandler}
    //             className="profileScreen__follow ml-auto"
    //           >
    //             Unfollow
    //           </button>
    //         )}
    //       </Row>
    //       <Row className="profileScreen__details-bio u-line">
    //         <p>{user.bio}</p>
    //       </Row>
    //       <Row className="profileScreen__details-friends flex align-items-center u-line py-2">
    //         <h4 className="m-0 p-0 my-font font-weight-bold pr-2">
    //           {user.friends.length}
    //         </h4>
    //         Friends
    //       </Row>
    //       <Row className="p-3 my-font font-weight-bold u-line">Tweets</Row>
    //       {tweets.map((tweet) => (
    //         <Tweet userInfo={userInfo} tweet={tweet} key={tweet._id} />
    //       ))}
    //     </Col>
    //   )}

    //   <Col className="thirdCol">
    //     <FollowRecommendation />
    //   </Col>
    // </Row>
  );
};

export default ProfileScreen;
