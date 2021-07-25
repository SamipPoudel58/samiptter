import React, { useState } from "react";
import SideNav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import FollowRecommendation from "../components/FollowRecommendation";
import ProfileInfo from "../components/ProfileInfo";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";

const Layout = ({ children }) => {
  const [navVisible, setNavVisible] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <>
      <SideNav />
      <section className="homeScreen__topNav">
        <i onClick={() => setNavVisible(true)} className="fas fa-bars"></i>
        <div className="homeScreen__logoHolder">
          <img className="homeScreen__samiptterLogo" src="/images/logo.png" alt="logo" />
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
            <img className="homeScreen__samiptterLogo" src="/images/logo.png" alt="logo" />
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

            <li onClick={logOutHandler} className="sideNav__navlink mb-2">
              Log Out
            </li>

            {userInfo && (
              <ProfileInfo
                name={userInfo.name}
                image={userInfo.image}
                id={userInfo._id}
                link={false}
              />
            )}
          </ul>
        </nav>
      </div>
      {children}
      <section className="rightNav__wrapper">
        <div className="rightNav">
          <FollowRecommendation />
        </div>
      </section>
    </>
  );
};

export default Layout;
