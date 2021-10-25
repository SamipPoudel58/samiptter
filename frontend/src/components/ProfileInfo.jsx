import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Verified } from "../assets/verified.svg";
import ProfilePicHolder from "./ProfilePicHolder";

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
            <ProfilePicHolder src={image || "/images/1.jpg"} />
          </Link>
        ) : (
          <ProfilePicHolder src={image || "/images/1.jpg"} />
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
