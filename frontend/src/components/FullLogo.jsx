import React from "react";
import { ReactComponent as Logo } from "../assets/logo.svg";
const FullLogo = () => {
  return (
    <div className="sideNav__logoHolder mb-2">
      <Logo className="sideNav__logo" />
      <h1 className="logo-text">Samiptter</h1>
    </div>
  );
};

export default FullLogo;
