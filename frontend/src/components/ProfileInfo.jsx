import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Verified } from "../assets/verified.svg";

const ProfileInfo = ({
  image,
  id,
  name,
  username,
  bio,
  isAdmin,
  isVerified,
  link = true,
}) => {
  return (
    <div className="profileInfo">
      <div className="profileInfo__imageHolder">
        {link ? (
          <Link to={`/profile/${id}`}>
            <img
              className="profileInfo__image profile-image"
              src={image || "/images/1.jpg"}
              alt={`${username}'s profile`}
            />
          </Link>
        ) : (
          <img
            className="profileInfo__image profile-image"
            src={image || "/images/1.jpg"}
            alt={`${username}'s profile`}
          />
        )}
      </div>
      <div className="profileInfo__details">
        {link ? (
          <Link
            to={`/profile/${id}`}
            className="profileInfo__name username-text"
          >
            {name} {isVerified && <Verified className="verified-badge" />}
          </Link>
        ) : (
          <p className="profileInfo__name username-text">
            {name} {isVerified && <Verified className="verified-badge" />}
          </p>
        )}
        <p className="profileInfo__more subtitle-text">
          {username?.length > 0
            ? "@" + username.toLowerCase().replace(" ", "")
            : "Logged In"}
        </p>
        {bio && <p className="profileInfo__bio paragraph">{bio}</p>}
      </div>
    </div>
  );
};

export default ProfileInfo;
