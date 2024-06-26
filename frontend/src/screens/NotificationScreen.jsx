import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotifications } from '../actions/userActions';
import Head from '../components/Head';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Layout from '../components/Layout';
import { getTimeFromNow } from '../utils/getTimeFromNow';
import NotificationSkeleton from '../components/skeletons/NotificationSkeleton';
import { GET_UNREAD_NOTIF_RESET } from '../constants/userConstants';

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const getNotif = useSelector((state) => state.getNotif);
  const { loading, notifications, error } = getNotif;

  useEffect(() => {
    dispatch(getNotifications());
    dispatch({ type: GET_UNREAD_NOTIF_RESET });
  }, [dispatch]);
  return (
    <div className="notificationScreen">
      <Head title="Notifications" />
      <Layout>
        <section className="newsFeed">
          <h1 className="heading-lg mb-2">Notifications</h1>

          <div className="notificationScreen__notifications">
            {loading ? (
              [...Array(5).keys()].map((num) => (
                <NotificationSkeleton key={num} />
              ))
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
                        <div
                          className={`notificationScreen__iconHolder notificationScreen__iconHolder-${notification.action}`}
                        >
                          {notification.action === 'like' ? (
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
                          ) : ['comment', 'mention'].includes(
                              notification.action
                            ) ? (
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
                          <span>{notification.sender.name}</span>{' '}
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
