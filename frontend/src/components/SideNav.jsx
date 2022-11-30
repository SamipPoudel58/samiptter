import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';
import ProfileInfo from './ProfileInfo';
import FullLogo from './FullLogo';
import { changeTheme } from '../actions/uiActions';
import useClickOutside from '../hooks/useClickOutside';

const SideNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [popUp, setPopUp] = useState(false);

  const popupRef = useRef();

  useClickOutside(popupRef, () => {
    if (popUp) setPopUp(false);
  });

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  // const getNotif = useSelector((state) => state.getNotif);
  // const { notifications } = getNotif;

  const getUnreadNotif = useSelector((state) => state.getUnreadNotif);
  const { newNotifications } = getUnreadNotif;

  const logOutHandler = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const toggleHandler = () => {
    dispatch(changeTheme(!darkMode));
  };

  useEffect(() => {
    if (!userInfo.username) {
      logOutHandler();
    }
  }, [dispatch, history, logOutHandler, userInfo.username]);

  return (
    <section className="sideNav">
      <nav className="sideNav__nav">
        <div className="sideNav__container">
          <FullLogo />
          <ul className="sideNav__navlinks">
            <NavLink
              exact
              to="/"
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>
                <svg
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 21H7C4.79086 21 3 19.2091 3 17V10.7076C3 9.30887 3.73061 8.01175 4.92679 7.28679L9.92679 4.25649C11.2011 3.48421 12.7989 3.48421 14.0732 4.25649L19.0732 7.28679C20.2694 8.01175 21 9.30887 21 10.7076V17C21 19.2091 19.2091 21 17 21Z"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 17H15"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Home</span>
              </li>
            </NavLink>
            <NavLink
              to="/search"
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>
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
                    strokeWidth={3}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>{' '}
                <span>Search</span>
              </li>
            </NavLink>
            <NavLink
              to="/notifications"
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>
                <div className="notification-indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                  </svg>
                  {newNotifications !== 0 && (
                    <div className="notification-badge">{newNotifications}</div>
                  )}
                </div>{' '}
                <span>Notification</span>
              </li>
            </NavLink>
            <NavLink
              exact
              to={`/profile/${userInfo.username}`}
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>
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
                </svg>{' '}
                <span>Profile</span>
              </li>
            </NavLink>
            <button
              className="sideNav__themeToggle mb-1"
              onClick={toggleHandler}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
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
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span>Theme</span>
            </button>
            {userInfo && userInfo.isAdmin && (
              <NavLink
                to="/dashboard"
                className="sideNav__navlink"
                activeClassName="sideNav__navlink-active"
              >
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>{' '}
                  <span>Dashboard</span>
                </li>
              </NavLink>
            )}
          </ul>
        </div>

        <div className="sideNav__profileInfoWrapper">
          <button
            onClick={() => setPopUp((prevValue) => !prevValue)}
            className="sideNav__profileInfo"
          >
            <div
              ref={popupRef}
              className={`sideNav__popup ${popUp && 'sideNav__popup-visible'}`}
            >
              <p
                onClick={logOutHandler}
                className="sideNav__popupOption sideNav__logOut username-text"
              >
                Log Out
              </p>
            </div>

            {userInfo && (
              <ProfileInfo
                name={
                  userInfo.name.length >= 16
                    ? userInfo.name.substring(0, 13) + '...'
                    : userInfo.name
                }
                image={userInfo.image}
                id={userInfo._id}
                link={false}
              />
            )}
          </button>
        </div>
      </nav>
    </section>
  );
};

export default SideNav;
