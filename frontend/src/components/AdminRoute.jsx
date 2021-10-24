import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminRoute({ component: Component, ...restOfProps }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        userInfo && userInfo.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default AdminRoute;
