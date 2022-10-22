import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from './Loader';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { tokenLoading, userInfo } = userLogin;

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        userInfo && userInfo.accessToken ? (
          <Component {...props} />
        ) : !tokenLoading ? (
          <Redirect to="/login" />
        ) : (
          <div className="token-loading">
            <Loader />
          </div>
        )
      }
    />
  );
}

export default ProtectedRoute;
