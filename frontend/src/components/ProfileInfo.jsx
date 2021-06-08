import React from "react";

const ProfileInfo = (name, username) => {
  return (
    <div className="profileInfo">
      <div className="profileInfo__imageHolder">
        <img
          className="profileInfo__image profile-image"
          src="/images/1.jpg"
          alt="profile picture"
        />
      </div>
      <div className="profileInfo__details">
        <h3 className="profileInfo__name username-text">Samip Poudel</h3>
        <p className="profileInfo__more subtitle-text">
          {!username.length > 0 && "Logged In"}
        </p>
      </div>
    </div>
  );
};

export default ProfileInfo;
