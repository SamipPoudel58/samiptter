import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const PageNotFound = () => {
  const history = useHistory();
  useEffect(() => {
    document.title = "404 | Page not Found ";
  });
  return (
    <div className="pageNotFound">
      <h1>404</h1>
      <p>{"Page not found :("}</p>
      <button onClick={() => history.push("/")} className="primary-btn mt-3">
        Take Me Back!
      </button>
    </div>
  );
};

export default PageNotFound;
