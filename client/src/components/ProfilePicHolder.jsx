import React from "react";

const ProfilePicHolder = ({ src, large = false }) => {
  return (
    <div className={large ? "profilePicHolder-lg" : "profilePicHolder"}>
      <img
        className={
          large
            ? "profilePicHolder-lg__background"
            : "profilePicHolder__background"
        }
        src={src}
        alt="user profile"
      />
      <img
        className={
          large ? "profilePicHolder-lg__main" : "profilePicHolder__main"
        }
        src={src}
        alt="user profile"
      />
    </div>
  );
};

export default ProfilePicHolder;
