import React from "react";
import { Link } from "react-router-dom";

const Notice = () => {
  return (
    <div className="notice">
      <div className="notice__icon">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="far"
          data-icon="info-circle"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          class="svg-inline--fa fa-info-circle fa-w-16 fa-3x"
        >
          <path
            fill="currentColor"
            d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm0-338c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
            class=""
          ></path>
        </svg>
      </div>
      <div className="notice__details">
        <p className="notice__description">
          {" "}
          You are currently using a guest account and are limited to handful of
          features. To enjoy the whole experience{" "}
          <Link to="/signup">Create an account</Link> or{" "}
          <Link className="/login">Login</Link> if you already have one.{" "}
        </p>
      </div>
    </div>
  );
};

export default Notice;
