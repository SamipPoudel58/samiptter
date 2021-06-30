import React from "react";
import { Link } from "react-router-dom";

const ProfileInfo = ({ image, id, name, username, link = true }) => {
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
            {name}
          </Link>
        ) : (
          <p className="profileInfo__name username-text">{name}</p>
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
