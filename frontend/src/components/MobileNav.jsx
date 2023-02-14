import React, { useState } from 'react';
import ProfileInfo from './ProfileInfo';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { logout } from '../actions/userActions';
import { changeTheme } from '../actions/uiActions';

const MobileNav = () => {
  const [navVisible, setNavVisible] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  const getUnreadNotif = useSelector((state) => state.getUnreadNotif);
  const { newNotifications } = getUnreadNotif;

  const logOutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  const toggleHandler = () => {
    dispatch(changeTheme(!darkMode));
  };
  return (
    <>
      <section className="homeScreen__topNav">
        <i onClick={() => setNavVisible(true)} className="fas fa-bars"></i>
        <div className="homeScreen__logoHolder">
          <img
            className="homeScreen__samiptterLogo"
            src="/images/logo.png"
            alt="Samiptter"
          />
          <Link to="/" className="logo-text">
            Samiptter™
          </Link>
        </div>
      </section>

      <div className="mobileNav">
        {navVisible && (
          <div
            onClick={() => setNavVisible(false)}
            className="mobileNav__backdrop"
          ></div>
        )}
        <nav className={`mobileNav__nav ${navVisible && 'visible'}`}>
          <div className="homeScreen__logoHolder homeScreen__logoHolder-left">
            <img
              className="homeScreen__samiptterLogo"
              src="/images/logo.png"
              alt="Samiptter"
            />
            <Link to="/" className="logo-text">
              Samiptter™
            </Link>
          </div>
          <ul className="mobileNav__links mt-2">
            <NavLink
              exact
              to="/"
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              exact
              to="/search"
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>Search</li>
            </NavLink>
            <NavLink
              exact
              to="/notifications"
              className="sideNav__navlink mb-1 mobileNav__navlink"
              activeClassName="sideNav__navlink-active"
            >
              <li>Notifications</li>
              {newNotifications !== 0 && (
                <div className="mobileNav__notification">
                  {newNotifications}
                </div>
              )}
            </NavLink>
            <NavLink
              exact
              to={`/profile/${userInfo.username}`}
              className="sideNav__navlink mb-1"
              activeClassName="sideNav__navlink-active"
            >
              <li>Profile</li>
            </NavLink>
            {userInfo && userInfo.isAdmin && (
              <NavLink
                exact
                to="/dashboard"
                className="sideNav__navlink mb-1"
                activeClassName="sideNav__navlink-active"
              >
                <li>Dashboard</li>
              </NavLink>
            )}

            <div className="sideNav__themeToggle" onClick={toggleHandler}>
              Theme
              <i
                className={`fas ${
                  !darkMode ? 'fa-moon' : 'fa-sun'
                } ml-1 mobileNav__themeIcon`}
              ></i>{' '}
            </div>

            <li onClick={logOutHandler} className="sideNav__navlink">
              Log Out
            </li>
          </ul>
          <div className="p-2">
            {userInfo && (
              <Link to={`/profile/${userInfo.username}`}>
                <ProfileInfo
                  name={userInfo.name}
                  image={userInfo.image}
                  id={userInfo._id}
                  link={false}
                />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileNav;
