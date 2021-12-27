import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboard } from "../actions/dashboardActions";
import Card from "../components/Card";
import Head from "../components/Head";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import ProfileInfo from "../components/ProfileInfo";
import { getTimeFromNow } from "../utils/getTimeFromNow";

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getDashboardData = useSelector((state) => state.getDashboard);
  let { userCount, tweetCount, latestUsers, notifications } = getDashboardData;

  useEffect(() => {
    if (!userInfo) {
      history.push("/");
    } else {
      dispatch(getDashboard());
    }
  }, [dispatch, history, userInfo]);
  return (
    <div className="dashboardScreen">
      <Head title="Dashboard" />
      <Layout>
        <section className="newsFeed">
          <h1 className="heading-lg">Hello {userInfo.name.split(" ")[0]}!</h1>

          <div className="dashboard__summaries mt-2">
            <Card icon="fas fa-users" detail="Total Users" number={userCount} />
            <Card
              icon="fas fa-quote-left"
              detail="Total Posts"
              number={tweetCount}
            />
          </div>

          <div className="dashboard__recentUsers mt-3 shadow">
            <h3 className="heading-sm">Recently Joined</h3>
            <div className="dashboard__recentUsersList mt-2">
              {latestUsers?.map((user) => (
                <div className="mb-1" key={user._id}>
                  <ProfileInfo
                    image={user.image}
                    id={user._id}
                    name={user.name}
                    username={user.username}
                    email={user.email}
                    isVerified={user.isVerified}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard__recentUsers mt-3">
            <h3 className="heading-sm">Recent Activity</h3>(
            <>
              {!notifications?.length > 0 && (
                <p className="paragraph mb-1">No Notifications.</p>
              )}
              {notifications?.map((notification) => (
                <Link to={notification.link} key={notification._id}>
                  <div
                    className="notificationScreen__notification"
                    style={{
                      backgroundColor: !notification.read
                        ? "var(--c-background)"
                        : "inherit",
                    }}
                  >
                    <div className="notificationScreen__icon">
                      <div
                        className={`notificationScreen__iconHolder notificationScreen__iconHolder-${notification.action}`}
                      >
                        {notification.action === "like" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 like"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : notification.action === "comment" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="#000000"
                          >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                          </svg>
                        )}
                      </div>
                      <img
                        className="profile-image"
                        src={notification.sender.image}
                        alt="notification sender"
                      />
                    </div>
                    <div>
                      <p className="notificationScreen__info mt-1">
                        <span>{notification.sender.name}</span>{" "}
                        {notification.message.replace(
                          /your|you/,
                          notification.receiver.name
                        )}{" "}
                      </p>
                      <p className="notificationScreen__time">
                        {getTimeFromNow(notification.createdAt)} ago
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
            )
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default DashboardScreen;
