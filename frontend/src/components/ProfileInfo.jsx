import React from "react";
import { Link } from "react-router-dom";

const ProfileInfo = ({ image, id, name, username }) => {
  return (
    <div className="profileInfo">
      <div className="profileInfo__imageHolder">
        <img
          className="profileInfo__image profile-image"
          src={image || "/images/1.jpg"}
          alt="profile picture"
        />
      </div>
      <div className="profileInfo__details">
        <p to={`/profile/${id}`} className="profileInfo__name username-text">
          {name || "User Hacker"}
        </p>
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
