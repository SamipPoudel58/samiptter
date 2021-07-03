import React from "react";
import SideNav from "./SideNav";
import FollowRecommendation from "../components/FollowRecommendation";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <nav className="homeScreen__topNav">
        <i className="fas fa-bars"></i>
        <Link to="/" className="logo-text">
          Samiptter
        </Link>
      </nav>
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
