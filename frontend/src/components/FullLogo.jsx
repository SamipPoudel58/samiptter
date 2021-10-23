import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
import { Link } from "react-router-dom";
const FullLogo = () => {
  return (
    <Link to="/">
      <div className="sideNav__logoHolder mb-2">
        <Logo className="sideNav__logo" />
        <h1 className="logo-text">Samiptter</h1>
      </div>
    </Link>
  );
};

export default FullLogo;
