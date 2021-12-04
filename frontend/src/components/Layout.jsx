import React, { useState } from "react";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import FollowRecommendation from "../components/FollowRecommendation";
import ProfileInfo from "../components/ProfileInfo";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import { changeTheme } from "../actions/uiActions";
import PreviewImage from "./PreviewImage";

const Layout = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uiTheme = useSelector((state) => state.uiTheme);
  const { darkMode } = uiTheme;

  const preview = useSelector((state) => state.preview);
  const { previewSrc, previewType } = preview;

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  const toggleHandler = () => {
    dispatch(changeTheme(!darkMode));
  };

  return (
    <>
      {previewSrc && <PreviewImage src={previewSrc} type={previewType} />}
      <SideNav />

      <section className="homeScreen__topNav">
        <i onClick={() => setNavVisible(true)} className="fas fa-bars"></i>
        <div className="homeScreen__logoHolder">
          <img
            className="homeScreen__samiptterLogo"
            src="/images/logo.png"
            alt="logo"
          />
          <Link to="/" className="logo-text">
            Samiptter
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
        <nav className={`mobileNav__nav ${navVisible && "visible"}`}>
          <div className="homeScreen__logoHolder homeScreen__logoHolder-left">
            <img
              className="homeScreen__samiptterLogo"
              src="/images/logo.png"
              alt="logo"
            />
            <Link to="/" className="logo-text">
              Samiptter
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
              to="/profile"
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
                  !darkMode ? "fa-moon" : "fa-sun"
                } ml-1 mobileNav__themeIcon`}
              ></i>{" "}
            </div>

            <li onClick={logOutHandler} className="sideNav__navlink mb-2">
              Log Out
            </li>
          </ul>
          <div className="ml-1">
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
      </div>
      {children}
      <section className="rightNav__wrapper">
        <div className="rightNav">
          <FollowRecommendation />

          <a
            href="https://github.com/SamipPoudel58/samiptter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase">
              <p className="rightNav__showcaseIntro">
                This project is open-sourced on github.
              </p>
              <p className="rightNav__showcaseLink">Check it out &rarr;</p>
              <img
                className="rightNav__showcaseImage"
                src="/images/github.png"
                alt="github logo"
              />
            </article>
          </a>

          <a
            href="https://samippoudel.com.np"
            target="_blank"
            rel="noopener noreferrer"
          >
            <article className="rightNav__showcase rightNav__showcase-creator">
              <p className="rightNav__showcaseIntro rightNav__showcaseIntro-creator">
                Hi! I am Samip. Check out my other projects.
              </p>
              <p className="rightNav__showcaseLink rightNav__showcaseLink-creator">
                See More &rarr;
              </p>
              <img
                className="rightNav__showcaseImage rightNav__showcaseImage-creator"
                src="/images/profile.jpg"
                alt="profile logo"
              />
            </article>
          </a>
        </div>
      </section>
    </>
  );
};

export default Layout;
