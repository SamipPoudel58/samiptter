import React from "react";
import SideNav from "./SideNav";
import FollowRecommendation from "../components/FollowRecommendation";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
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
