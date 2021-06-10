import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import ProfileInfo from "./ProfileInfo";

const SideNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [backDrop, setBackDrop] = useState(false);
  const [popUp, setPopUp] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <section className="sideNav">
      <nav className="sideNav__nav">
        <h1 className="logo-text mb-4">Samiptter</h1>
        <ul className="sideNav__navlinks">
          <NavLink
            to="/"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-home mr-1"></i> Home
            </li>
          </NavLink>
          <NavLink
            to="/search"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-search mr-1"></i> Search
            </li>
          </NavLink>
          <NavLink
            to="/profile"
            className="sideNav__navlink mb-4"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-user mr-1"></i> Profile
            </li>
          </NavLink>
        </ul>
        <div className="sideNav__profileInfo">
          <ProfileInfo
            name={userInfo.name}
            image={userInfo.image}
            id={userInfo._id}
          />
        </div>
      </nav>
    </section>
  );
};

export default SideNav;
