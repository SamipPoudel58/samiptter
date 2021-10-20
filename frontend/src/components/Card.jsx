import React from "react";

const Card = ({ icon, detail, number }) => {
  return (
    <div className="Card shadow">
      <div className="Card__icon">
        <i className={icon}></i>
      </div>
      <div className="Card__details">
        <p className="paragraph">{detail}</p>
        <h3 className="heading-lg">{number}</h3>
      </div>
    </div>
  );
};

export default Card;
