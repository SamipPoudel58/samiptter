import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { logout } from "../actions/userActions";
import ProfileInfo from "./ProfileInfo";
import Switch from "./Switch";
import FullLogo from "./FullLogo";

const SideNav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
            to="/profile"
            className="sideNav__navlink mb-1"
            activeClassName="sideNav__navlink-active"
          >
            <li>
              <i className="fas fa-user mr-1"></i> Profile
            </li>
          </NavLink>
        </ul>
        <div
          onClick={() => setPopUp((prevValue) => !prevValue)}
          className="sideNav__profileInfo"
        >
          <div
            className={`sideNav__popup ${popUp && "sideNav__popup-visible"}`}
          >
            <p
              onClick={logOutHandler}
              className="sideNav__popupOption sideNav__logOut username-text"
            >
              Log Out
            </p>
            {/* <div className="sideNav__popupOption sideNav__darkSwitch">
              <Switch className="sideNav__logOut" />
            </div> */}
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
