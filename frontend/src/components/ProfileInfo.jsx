import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Verified } from "../assets/verified.svg";

const ProfileInfo = ({ image, id, name, username, isAdmin, link = true }) => {
  console.log(name, isAdmin);
  return (
    <div className="profileInfo">
      <div className="profileInfo__imageHolder">
        <img
          className="profileInfo__image profile-image"
          src={image || "/images/1.jpg"}
          alt={`${username}'s profile`}
        />
      </div>
      <div className="profileInfo__details">
        {link ? (
          <Link
            to={`/profile/${id}`}
            className="profileInfo__name username-text"
          >
            {name} {isAdmin && <Verified className="verified-badge" />}
          </Link>
        ) : (
          <p className="profileInfo__name username-text">
            {name} {isAdmin && <Verified className="verified-badge" />}
          </p>
        )}
        <p className="profileInfo__more subtitle-text">
          {username?.length > 0
            ? "@" + username.toLowerCase().replace(" ", "")
            : "Logged In"}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
