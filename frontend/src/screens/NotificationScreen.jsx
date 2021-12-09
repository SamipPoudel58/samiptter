import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getNotifications } from "../actions/userActions";
import Head from "../components/Head";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Layout from "../components/Layout";
import { getTimeFromNow } from "../utils/getTimeFromNow";

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const getNotif = useSelector((state) => state.getNotif);
  const { loading, notifications, error } = getNotif;

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch, userInfo]);
  return (
    <div className="notificationScreen">
      <Head title="Notifications" />
      <Layout>
        <section className="newsFeed">
          <h1 className="heading-lg mb-2">Notifications</h1>

          <div className="notificationScreen__notifications">
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <>
                {!notifications.length > 0 && (
                  <p className="paragraph mb-1">No Notifications.</p>
                )}
                {notifications.map((notification) => (
                  <Link to={notification.link} key={notification._id}>
                    <div className="notificationScreen__notification">
                      <div className="notificationScreen__icon">
                        <div className="notificationScreen__iconHolder">
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
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
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
                          {notification.message}
                        </p>
                        <p className="notificationScreen__time">
                          {getTimeFromNow(notification.createdAt)} ago
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </section>
      </Layout>
    </div>
  );
};

export default NotificationScreen;
