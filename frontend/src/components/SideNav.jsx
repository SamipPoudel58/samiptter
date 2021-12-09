import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getUnreadNotifications, logout } from "../actions/userActions";
import ProfileInfo from "./ProfileInfo";
import FullLogo from "./FullLogo";
import { changeTheme } from "../actions/uiActions";
import { TWEET_LIST_RESET } from "../constants/tweetConstants";
import useClickOutside from "../hooks/useClickOutside";
import {
  GET_NOTIFICATIONS_RESET,
  GET_UNREAD_NOTIF_RESET,
} from "../constants/userConstants";

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

  useEffect(() => {
    dispatch(getUnreadNotifications());
  }, [dispatch]);

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/login");
    dispatch({ type: TWEET_LIST_RESET });
    dispatch({ type: GET_NOTIFICATIONS_RESET });
    dispatch({ type: GET_UNREAD_NOTIF_RESET });
  };

  const toggleHandler = () => {
    dispatch(changeTheme(!darkMode));
  };

  return (
    <section className="sideNav">
      <nav className="sideNav__nav">
        <FullLogo />
        <ul className="sideNav__navlinks">
          <NavLink
            exact
            to="/"
            className="sideNav__navlink mb-1"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-home mr-1"></i> Home
            </li>
          </NavLink>
          <NavLink
            to="/search"
            className="sideNav__navlink mb-1"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-search mr-1"></i> Search
            </li>
          </NavLink>
          <NavLink
            to="/notifications"
            className="sideNav__navlink mb-1"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <div className="notification-indicator">
                <i className="fas fa-bell mr-1"></i>
                {newNotifications !== 0 && (
                  <div className="notification-badge">{newNotifications}</div>
                )}
              </div>{" "}
              Notifications
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            className="sideNav__navlink mb-1"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-user mr-1"></i> Profile
            </li>
          </NavLink>
          <div className="sideNav__themeToggle mb-1" onClick={toggleHandler}>
            <i className={`fas ${darkMode ? "fa-moon" : "fa-sun"} mr-1`}></i>{" "}
            Theme
          </div>
          {userInfo && userInfo.isAdmin && (
            <NavLink
              to="/dashboard"
              className="sideNav__navlink"
              activeClassName="sideNav__navlink-active"
            >
              <li>
                <i className="fas fa-chart-line mr-1"></i> Dashboard
              </li>
            </NavLink>
          )}
        </ul>
        <div
          onClick={() => setPopUp((prevValue) => !prevValue)}
          className="sideNav__profileInfo"
        >
          <div
            ref={popupRef}
            className={`sideNav__popup ${popUp && "sideNav__popup-visible"}`}
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
              name={userInfo.name}
              image={userInfo.image}
              id={userInfo._id}
              link={false}
            />
          )}
        </div>
      </nav>
    </section>
  );
};

export default SideNav;
