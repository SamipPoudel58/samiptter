import React from "react";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className="pageNotFound">
      <h1>404</h1>
      <p>{"Page not found :("}</p>
      <button onClick={history.goBack} className="primary-btn mt-3">
        Take Me Back!
      </button>
    </div>
  );
};

export default PageNotFound;
